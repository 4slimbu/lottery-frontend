import {DEFAULT_MY_STATE} from "../data/default";
import {SET_PLAYED_GAMES, SET_TRANSACTIONS} from "../constants/actionTypes";

export default (state = DEFAULT_MY_STATE, action = {}) => {
    switch (action.type) {
        case `${SET_PLAYED_GAMES}` :
            return {
                ...state,
                playedGames: action.payload
            };
        case `${SET_TRANSACTIONS}` :
            return {
                ...state,
                transactions: action.payload
            };
        default:
            return state;
    }
}