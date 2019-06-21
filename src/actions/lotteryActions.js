import {
    SET_LOTTERY_WINNERS,
} from "../constants/actionTypes";

export function setLotteryWinners(payload) {
    return {
        type: SET_LOTTERY_WINNERS,
        payload
    }
}