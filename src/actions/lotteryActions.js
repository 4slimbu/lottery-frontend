import {
    ADD_LOTTERY_PLAYER, SET_LAST_SLOT, SET_LOTTERY_DATA, SET_LOTTERY_PICKED_NUMBERS,
    SET_LOTTERY_PLAYERS, SET_LOTTERY_RESULT,
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

export function addLotterySlotPlayer(payload) {
    return {
        type: ADD_LOTTERY_PLAYER,
        payload
    }
}

export function setLastSlot(lastSlot) {
    return {
        type: SET_LAST_SLOT,
        lastSlot
    }
}

export function setLotteryPickedNumbers(pickedNumbers) {
    return {
        type: SET_LOTTERY_PICKED_NUMBERS,
        pickedNumbers
    }
}

export function setLotteryData(payload) {
    return {
        type: SET_LOTTERY_DATA,
        payload
    }
}