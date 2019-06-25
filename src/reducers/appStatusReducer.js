import {DEFAULT_APP_STATUS} from "../data/default";
import {SET_CURRENCIES, SET_MODAL, SET_SETTINGS} from "../constants/actionTypes";

export default (state = DEFAULT_APP_STATUS, action = {}) => {
    switch (action.type) {
        case `${SET_MODAL}` :
            return {
                ...state,
                modal: action.modal
            };
        case `${SET_CURRENCIES}` :
            return {
                ...state,
                currencies: action.currencies
            };
        case `${SET_SETTINGS}` :
            return {
                ...state,
                settings: action.settings
            };
        default:
            return state;
    }
}