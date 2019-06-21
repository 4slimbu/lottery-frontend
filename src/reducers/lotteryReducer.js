import {DEFAULT_LOTTERY_STATE} from "../data/default";
import {ADD_LOTTERY_PLAYER, SET_LOTTERY_PLAYERS, SET_LOTTERY_SLOT, SET_LOTTERY_WINNERS, SET_LOTTERY_RESULT} from "../constants/actionTypes";

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
        case `${SET_LOTTERY_RESULT}` :
            let data = {};
            data.result = action.payload.result;
            data.hasWinner = action.payload.has_winner;

            if (action.payload.last_winners) {
                data.lastWinners = action.payload.last_winners;
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
        default:
            return state;
    }
}