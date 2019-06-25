import {
    SET_APP_SETTINGS, SET_CURRENCIES,
    SET_EVENTS, SET_MODAL, SET_SETTINGS,
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