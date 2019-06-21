import {
    SET_LOTTERY_PLAYERS,
    SET_LOTTERY_SLOT,
    SET_LOTTERY_WINNERS,
} from "../constants/actionTypes";

export function setLotteryWinners(payload) {
    return {
        type: SET_LOTTERY_WINNERS,
        payload
    }
}

export function setLotterySlot(payload) {
    return {
        type: SET_LOTTERY_SLOT,
        payload
    }
}

export function setLotteryPlayers(payload) {
    return {
        type: SET_LOTTERY_PLAYERS,
        payload
    }
}

