import * as axios from "axios";
import {getEnv} from "../utils/helper/helperFunctions";

// const API_BASE_URL = "https://ddd6a02c.ngrok.io/api/v1";
const API_BASE_URL = "http://lottery-api.test/api/v1";
/**
 * This handles all the api request. If REACT_APP_ENV = mock-api, then the data
 * is faked and returned as async promise object using mock data.
 *
 * To know what type of data is expected by the application, look at the mock data.
 *
 * @param type
 * @param url
 * @param userData
 */
const requests = (type, url, userData = {}) => {
    if (getEnv('ENV') === 'mock-api') {
        // return mockApi(type, url, userData = {});
    } else {
        return axios({
            method: type,
            url: url,
            data: userData,
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
    }
};

/**
 * Handles all Auth related requests
 */
const Auth = {
    login: (data) =>
        requests('POST', API_BASE_URL + "/login", data),
    logout: () =>
        requests('PUT', API_BASE_URL + "/logout"),
    register: (data) =>
        requests('POST', API_BASE_URL + "/register", data),
    forgotPassword: (data) =>
        requests('POST', API_BASE_URL + "/forgot-password", data),
    resetPassword: (data) =>
        requests('PUT', API_BASE_URL + "/reset-password", data),
};

/**
 * Handles all Business related requests
 */
const Users = {
    all: (query) =>
        requests('GET', API_BASE_URL + "/users?" + query),
    get: (id) =>
        requests('GET',API_BASE_URL + `/users/${id}`),
    create: (data) =>
        requests('POST', API_BASE_URL + "/users", data),
    update: (data) =>
        requests('PUT', API_BASE_URL + "/users/" + data.id, data),
    updateMultiple: (data) =>
        requests('PUT', API_BASE_URL + "/users", data),
    deleteMultiple: (data) =>
        requests('DELETE', API_BASE_URL + "/users", data),
};

/**
 * Handles all Permissions related requests
 */
const Permissions = {
    all: (query) =>
        requests('GET', API_BASE_URL + "/permissions?" + query),
    get: (id) =>
        requests('GET',API_BASE_URL + `/permissions/${id}`),
    create: (data) =>
        requests('POST', API_BASE_URL + "/permissions", data),
    update: (data) =>
        requests('PUT', API_BASE_URL + "/permissions/" + data.id, data),
    deleteMultiple: (data) =>
        requests('DELETE', API_BASE_URL + "/permissions", data),
};

/**
 * Handles all Business related requests
 */
const Roles = {
    all: (query) =>
        requests('GET', API_BASE_URL + "/roles?" + query),
    get: (id) =>
        requests('GET',API_BASE_URL + `/roles/${id}`),
    create: (data) =>
        requests('POST', API_BASE_URL + "/roles", data),
    update: (data) =>
        requests('PUT', API_BASE_URL + "/roles/" + data.id, data),
    deleteMultiple: (data) =>
        requests('DELETE', API_BASE_URL + "/roles", data),
};

/**
 * Handles all Settings related requests
 */
const Settings = {
    all: (data) =>
        requests('GET', API_BASE_URL + "/settings?" + data.query),
};

/**
 * Handles all Currencies related requests
 */
const Currencies = {
    all: (data) =>
        requests('GET', API_BASE_URL + "/currencies?" + data.query),
};

/**
 * Handles all Currencies related requests
 */
const Me = {
    get: (data) =>
        requests('GET', API_BASE_URL + "/me"),
    play: (data) =>
        requests('POST', API_BASE_URL + "/me/play", data),
    getPlayedGames: (data) =>
        requests('GET', API_BASE_URL + "/me/played-games"),
    getTransactions: (data) =>
        requests('GET', API_BASE_URL + "/me/transactions"),
    getWithdrawRequests: (data) =>
        requests('GET', API_BASE_URL + "/me/withdraw-requests"),
};

/**
 * Handles all Lottery related requests
 */
const Lottery = {
    slots: {
        all: (query) =>
            requests('GET', API_BASE_URL + "/lottery/slots?" + query),
        get: (data) =>
            requests('GET',API_BASE_URL + `/lottery/slots/${data.id}?` + data.query),
        getWinners: (data) =>
            requests('GET',API_BASE_URL + `/lottery/slots/winners?` + data.query),
        create: (data) =>
            requests('POST', API_BASE_URL + "/lottery/slots", data),
        update: (data) =>
            requests('PUT', API_BASE_URL + "/lottery/slots/" + data.id, data),
        deleteMultiple: (data) =>
            requests('DELETE', API_BASE_URL + "/lottery/slots", data),
        winners: (data) =>
            requests('GET',API_BASE_URL + `/lottery/slots/winners?` + data.query),
        getActive: (data) =>
            requests('GET', API_BASE_URL + `/lottery/slots/3?with=participants&is_active=true`),
        last: (data) =>
            requests('GET',API_BASE_URL + `/lottery/slots/last`),
    }
};

export default {
    Auth,
    Users,
    Permissions,
    Me,
    Settings,
    Currencies,
    Lottery,
};
