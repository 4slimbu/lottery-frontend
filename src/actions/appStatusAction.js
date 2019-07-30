import {
    ADD_TO_ROOT_CSS_CLASS_LIST,
    REMOVE_FROM_ROOT_CSS_CLASS_LIST,
    SET_APP_SETTINGS,
    SET_CURRENCIES,
    SET_EVENTS,
    SET_MODAL,
    SET_SETTINGS,
    UPDATE_BROWSE_HISTORY,
} from "../constants/actionTypes";

export function setEvents(events) {
    return {
        type: SET_EVENTS,
        events
    }
}

export function setAppSettings(settings) {
    return {
        type: SET_APP_SETTINGS,
        settings
    }
}

export function setModal(modal) {
    return {
        type: SET_MODAL,
        modal
    }
}

export function setCurrencies(currencies) {
    return {
        type: SET_CURRENCIES,
        currencies
    }
}

export function setSettings(settings) {
    return {
        type: SET_SETTINGS,
        settings
    }
}

export function addToRootCssClassList(cssClass) {

    return {
        type: ADD_TO_ROOT_CSS_CLASS_LIST,
        payload: cssClass
    }
}

export function removeFromRootCssClassList(cssClass) {

    return {
        type: REMOVE_FROM_ROOT_CSS_CLASS_LIST,
        payload: cssClass
    }
}

export function updateBrowseHistory(data) {

    return {
        type: UPDATE_BROWSE_HISTORY,
        payload: data
    }
}