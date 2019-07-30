import {DEFAULT_APP_STATUS} from "../data/default";
import {
    ADD_TO_ROOT_CSS_CLASS_LIST, REMOVE_FROM_ROOT_CSS_CLASS_LIST, SET_CURRENCIES, SET_MODAL, SET_SETTINGS,
} from "../constants/actionTypes";

export default (state = DEFAULT_APP_STATUS, action = {}) => {
    switch (action.type) {
        case `${SET_MODAL}` :
            return {
                ...state,
                modal: action.modal
            };
        case `${SET_CURRENCIES}` :
            localStorage.setItem("currencies", JSON.stringify(action.currencies));
            return {
                ...state,
                currencies: action.currencies
            };
        case `${SET_SETTINGS}` :
            localStorage.setItem("settings", JSON.stringify(action.settings));
            return {
                ...state,
                settings: action.settings
            };
        case `${ADD_TO_ROOT_CSS_CLASS_LIST}` :
            return {
                ...state,
                rootCssClassList: [
                    ...state.rootCssClassList,
                    action.payload
                ]
            };
        case `${REMOVE_FROM_ROOT_CSS_CLASS_LIST}` :
            let newClassList = [...state.rootCssClassList];
            let index = newClassList.indexOf(action.payload);

            if (index > -1) {
                newClassList.splice(index, 1);
            }

            return {
                ...state,
                rootCssClassList: newClassList
            };
        default:
            return state;
    }
}