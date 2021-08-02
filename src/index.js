import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import "./assets/css/bootstrap.css";
import "./assets/css/style.css";
import AppMain from "./Layout/AppMain";
import configureStore from "./config/configureStore";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthorizationToken from "./utils/axios/setAuthorizationToken";
import { setAuth, setUser } from "./actions/authActions";
import Echo from "laravel-echo";
import {
  setLotterySlot,
  addLotterySlotPlayer,
  setLotteryPlayers,
  setLotteryData,
} from "./actions/lotteryActions";
import { setCurrencies, setSettings } from "./actions/appStatusAction";
import { getEnv } from "./utils/helper/helperFunctions";

let jwtToken = "";
export const store = configureStore();
const rootElement = document.getElementById("root");

// check if jwtToken exist in local storage and is valid
if (localStorage.getItem("jwtToken")) {
  try {
    const decodedToken = jwt_decode(localStorage.getItem("jwtToken"));
    if (decodedToken.exp > new Date().getTime() / 1000) {
      jwtToken = localStorage.getItem("jwtToken");
      setAuthorizationToken(jwtToken);
      store.dispatch(setAuth(decodedToken));
    } else {
      localStorage.removeItem("jwtToken");
      setAuthorizationToken(false);
      store.dispatch(setAuth({}));
    }
  } catch (err) {
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false);
    store.dispatch(setAuth({}));
  }
}

// set user
let userId = null;
if (localStorage.getItem("user")) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    userId = user.id;
    store.dispatch(setUser(user));
  } catch (err) {}
}

// set currencies
if (localStorage.getItem("currencies")) {
  try {
    const currencies = JSON.parse(localStorage.getItem("currencies"));
    store.dispatch(setCurrencies(currencies));
  } catch (err) {}
}

// set settings
if (localStorage.getItem("settings")) {
  try {
    const settings = JSON.parse(localStorage.getItem("settings"));
    store.dispatch(setSettings(settings));
  } catch (err) {}
}

const renderApp = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Component />
      </Router>
    </Provider>,
    rootElement
  );
};

renderApp(AppMain);

window.io = require("socket.io-client");
window.Echo = new Echo({
  broadcaster: "socket.io",
  host: getEnv("APP_SOCKET_URL"),
  // host: window.location.hostname + ':6001',
  auth: {
    headers: {
      Authorization: "Bearer " + jwtToken,
    },
  },
});

window.Echo.channel("lottery")
  .listen("LotterySlotCreatedEvent", (e) => {
    store.dispatch(setLotterySlot(e.data));
    store.dispatch(setLotteryPlayers({ data: [] }));
  })
  .listen("LotterySlotClosedEvent", (e) => {
    store.dispatch(setLotteryData(e));
  })
  .listen("ParticipantAddedEvent", (e) => {
    let slot = e.data;
    let participant = e.participant;
    store.dispatch(setLotterySlot(slot));
    store.dispatch(addLotterySlotPlayer(participant));
  });

window.Echo.private("App.User." + userId).listen("UserUpdateEvent", (e) => {
  console.log("UserUpdateEvent", e.token);
  if (e.token) {
    localStorage.setItem("jwtToken", e.token);
    setAuthorizationToken(e.token);
    this.props.setAuth(jwt_decode(e.token));
  }
});
