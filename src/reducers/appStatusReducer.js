import {DEFAULT_APP_STATUS} from "../data/default";
import {
    ADD_TO_ROOT_CSS_CLASS_LIST, REMOVE_FROM_ROOT_CSS_CLASS_LIST, SET_CURRENCIES, SET_MODAL, SET_SETTINGS,
    UPDATE_BROWSE_HISTORY,
} from "../constants/actionTypes";
import * as _ from "lodash";

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
        case `${UPDATE_BROWSE_HISTORY}` :
            // update locations
            let locations = [...state.browseHistory.locations];

            if (locations.length > 15) {
                locations.shift();
            }

            if (action.payload && action.payload.location) {
                locations = locations.concat([action.payload.location]);
            }

            // update autoTasks
            let autoTasks = [...state.browseHistory.autoTasks];
            if (action.payload && action.payload.autoTasks) {
                autoTasks = action.payload.autoTasks;
            }

            // update state
            return {
                ...state,
                browseHistory: {
                    locations: locations,
                    autoTasks: autoTasks
                }
            };
        default:
            return state;
    }
}