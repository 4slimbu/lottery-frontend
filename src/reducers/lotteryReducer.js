import {DEFAULT_LOTTERY_STATE} from "../data/default";
import {SET_LOTTERY_WINNERS} from "../constants/actionTypes";

export default (state = DEFAULT_LOTTERY_STATE, action = {}) => {
    switch (action.type) {
        case `${SET_LOTTERY_WINNERS}` :
            return {
                ...state,
                winners: action.payload
            };
        default:
            return state;
    }
}