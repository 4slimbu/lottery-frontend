import {DEFAULT_APP_STATUS} from "../data/default";
import {SET_MODAL} from "../constants/actionTypes";

export default (state = DEFAULT_APP_STATUS, action = {}) => {
    switch (action.type) {
        case `${SET_MODAL}` :
            return {
                ...state,
                modal: action.modal
            };
        default:
            return state;
    }
}