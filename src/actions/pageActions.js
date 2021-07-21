import {SET_PAGE} from "../constants/actionTypes";

export function setPage(payload) {
    return {
        type: SET_PAGE,
        payload
    }
}