import {combineReducers} from "redux";
import flashMessageReducer from "./reducers/flashMessageReducer";
import authReducer from "./reducers/authReducer";
import appStatusReducer from "./reducers/appStatusReducer";
import loadingMessageReducer from "./reducers/loadingMessageReducer";
import lotteryReducer from "./reducers/lotteryReducer";
import myReducer from "./reducers/myReducer";
import pageReducer from "./reducers/pageReducer";

export default combineReducers({
    authReducer,
    appStatusReducer,
    lotteryReducer,
    myReducer,
    pageReducer,
    flashMessageReducer,
    loadingMessageReducer,
});