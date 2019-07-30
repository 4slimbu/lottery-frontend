import {
    ADD_TO_ROOT_CSS_CLASS_LIST, REMOVE_FROM_ROOT_CSS_CLASS_LIST,
    SET_APP_SETTINGS, SET_CURRENCIES,
    SET_EVENTS, SET_MODAL, SET_SETTINGS, UPDATE_ROOT_CSS_CLASS_LIST,
} from "../constants/actionTypes";
import * as _ from "lodash";
import {toggleItemInArray} from "../utils/helper/helperFunctions";

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