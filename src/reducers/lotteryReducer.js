import {DEFAULT_LOTTERY_STATE} from "../data/default";
import {
    ADD_LOTTERY_PLAYER, SET_LOTTERY_PLAYERS, SET_LOTTERY_SLOT, SET_LOTTERY_WINNERS,
    SET_LOTTERY_DATA, SET_LAST_SLOT, SET_LOTTERY_PICKED_NUMBERS
} from "../constants/actionTypes";

export default (state = DEFAULT_LOTTERY_STATE, action = {}) => {
    switch (action.type) {
        case `${SET_LOTTERY_WINNERS}` :
            return {
                ...state,
                winners: action.payload
            };
        case `${SET_LOTTERY_SLOT}` :
            return {
                ...state,
                slot: action.payload
            };
        case `${SET_LOTTERY_PLAYERS}` :
            return {
                ...state,
                players: action.payload
            };
        case `${ADD_LOTTERY_PLAYER}` :
            return {
                ...state,
                players: {
                    ...state.players,
                    data: [
                        action.payload,
                        ...state.players.data
                    ]
                }
            };
        case `${SET_LOTTERY_DATA}` :
            let data = {};

            if (action.payload.lastSlot) {
                data.lastSlot = action.payload.lastSlot;
            }

            if (action.payload.winners) {
                data.winners = {
                    ...state.winners,
                    data: action.payload.winners
                };
            }

            return {
                ...state,
                ...data
            };
        case `${SET_LAST_SLOT}` :
            return {
                ...state,
                lastSlot: action.lastSlot
            };
        case `${SET_LOTTERY_PICKED_NUMBERS}` :
            return {
                ...state,
                pickedNumbers: action.pickedNumbers
            };
        default:
            return state;
    }
}