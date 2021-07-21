import {SET_PLAYED_GAMES, SET_TRANSACTIONS, SET_WITHDRAW_REQUESTS} from "../constants/actionTypes";

export function setPlayedGames(payload) {
    return {
        type: SET_PLAYED_GAMES,
        payload
    }
}

export function setTransactions(payload) {
    return {
        type: SET_TRANSACTIONS,
        payload
    }
}

export function setWithdrawRequests(payload) {
    return {
        type: SET_WITHDRAW_REQUESTS,
        payload
    }
}