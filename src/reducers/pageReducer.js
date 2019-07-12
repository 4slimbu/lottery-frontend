import {DEFAULT_PAGE_STATE} from "../data/default";
import {SET_PAGE} from "../constants/actionTypes";

export default (state = DEFAULT_PAGE_STATE, action = {}) => {
    switch (action.type) {
        case `${SET_PAGE}` :
            return {
                ...state,
                pages: [
                    ...state.pages,
                    action.payload.data
                ]
            };
        default:
            return state;
    }
}