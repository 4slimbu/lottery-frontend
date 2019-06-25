import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter } from 'react-router-dom';
import './assets/css/bootstrap.css';
import './assets/css/style.css';
import AppMain from './Layout/AppMain';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';
import jwt_decode from "jwt-decode";
import setAuthorizationToken from "./utils/axios/setAuthorizationToken";
import {setAuth} from "./actions/authActions";
import Echo from 'laravel-echo';
import {setLotterySlot, addLotterySlotPlayer, setLotteryResult, setLotteryPlayers} from "./actions/lotteryActions";

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

renderApp(AppMain);

// window.io = require('socket.io-client');
// window.Echo = new Echo({
//     broadcaster: 'socket.io',
//     host: window.location.hostname + ':6001'
// });
//
// window.Echo.channel('lottery')
//     .listen('LotterySlotCreatedEvent', (e) => {
//         console.log('lottery slot created event', e);
//         store.dispatch(setLotterySlot(e.data));
//         store.dispatch(setLotteryPlayers({data: []}));
//     }).listen('LotterySlotClosedEvent', (e) => {
//         console.log('Lottery Slot Closed Event', e);
//         store.dispatch(setLotteryResult(e));
//     }).listen('ParticipantAddedEvent', (e) => {
//         let slot = e.data;
//         let participant = e.participant;
//         console.log('pae');
//         console.log(e);
//         store.dispatch(setLotterySlot(slot));
//         store.dispatch(addLotterySlotPlayer(participant));
//     });