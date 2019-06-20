import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter } from 'react-router-dom';
// import './assets/base.scss';
import Main from './Modules/Main';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';
import jwt_decode from "jwt-decode";
import setAuthorizationToken from "./utils/axios/setAuthorizationToken";
import {setAuth} from "./actions/authActions";
import Echo from 'laravel-echo';

const store = configureStore();
const rootElement = document.getElementById('root');

// check if jwtToken exist in local storage and is valid
if (localStorage.getItem("jwtToken")) {
    try {
        const decodedToken = jwt_decode(localStorage.getItem("jwtToken"));
        if (decodedToken.exp > (new Date().getTime() / 1000)) {
            setAuthorizationToken(localStorage.getItem("jwtToken"));
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


const renderApp = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <HashRouter>
                <Component />
            </HashRouter>
        </Provider>,
        rootElement
    );
};

renderApp(Main);

window.io = require('socket.io-client');
window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001'
});

window.Echo.channel('lottery')
    .listen('LotterySlotClosedEvent', (e) => {
        console.log(e);
    }).listen('LotterySlotCreatedEvent', (e) => {
        console.log(e);
    }).listen('LotterySlotResultGeneratedEvent', (e) => {
        console.log(e);
    }).listen('ParticipantAddedEvent', (e) => {
        console.log(e);
    });