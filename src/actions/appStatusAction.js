import {
    SET_APP_SETTINGS,
    SET_EVENTS,
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