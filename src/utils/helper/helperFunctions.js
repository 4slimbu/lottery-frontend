import {MESSAGES} from "../../constants/messages";
import Cookies from 'universal-cookie';
import * as _ from "lodash";

/*
==========================================================================
App Helper Functions
==========================================================================
 */
/**
 * This is a wrapper function to get the env variable without using the
 * prefix REACT_APP_
 *
 * @param key
 * @return {string}
 */
export function getEnv(key) {
    return process.env['REACT_APP_' + key];
}

/**
 * Transform 'slug_string' or 'camelCaseString' or 'any type of string' to 'Capitalized Words'
 *
 * @param string
 * @returns {string}
 */
export function toCapitalizedWords(string) {
    const newString = string.replace(/([A-Z])/g, ' $1')
        .replace(/([_])/g, ' ');

    return firstOfEachWordToUppercase(newString);
}

/**
 * Capitalize first letter of each words in a string
 *
 * @param str
 * @returns {string}
 */
export function firstOfEachWordToUppercase(str) {
    let array = str.split(' ');
    let newArray = [];

    for (let x = 0; x < array.length; x++) {
        newArray.push(array[x].charAt(0).toUpperCase() + array[x].slice(1));
    }

    return newArray.join(' ');
}

/**
 * Format Date to user friendly string
 *
 * @param dateString
 * @returns {string}
 */
export function formatDate(dateString) {
    let options = {day: 'numeric', month: 'long', year: 'numeric'};
    let date = new Date(dateString.replace(' ', 'T'));

    // return dateString;
    return date.toLocaleString("en-US", options);
}

/*
==========================================================================
Data Handling Helper Functions
==========================================================================
 */
/**
 * Use error code to get error message
 *
 * @param errorCode
 * @return {string}
 */
export function getCodeMessage(errorCode) {
    return MESSAGES[errorCode] ? MESSAGES[errorCode] : MESSAGES.ERR_UNKNOWN;
}

/*
==========================================================================
Extra Helper Functions
==========================================================================
 */

export function getCookie(name, options = {}) {
    const cookies = new Cookies();
    return cookies.get(name, options);
}

export function setCookie(name, value, options = {}) {
    const cookies = new Cookies();
    cookies.set(name, value, options);
}

export function generateRandomLotteryNumber() {
    let lotteryNumber = [];

    while (lotteryNumber.length < 6) {
        let randNumber = Math.floor(Math.random() * 100) + 1;

        if (randNumber !== 100 && lotteryNumber.indexOf(randNumber) === -1) {
            lotteryNumber.push(randNumber);
        }
    }

    return lotteryNumber;
}

export function getLotteryNumbersOnly(pickedNumbers) {
    let arr = [];

    _.forEach(pickedNumbers, function (item, key) {
        if (typeof item === "number") {
            arr.push(item);
        }
    });

    return arr;
}

export function inPickedNumbers(pickedNumbers, number) {
    let numberKey = "";

    _.forEach(pickedNumbers, function (item, key) {
        if (item === number) {
            return key;
        }
    });

    return numberKey;
}

export function getFirstEmptyPosition(pickedNumbers) {
    let firstEmptyKey;

    _.forEach(pickedNumbers, function (item, key) {
        if (typeof item === 'undefined') {
            if (typeof firstEmptyKey === 'undefined') {
                firstEmptyKey = key;
            }
        }
    });

    return firstEmptyKey;
}

export function findSetting(settings, key) {
    return _.find(settings, {key: key});
}

export function checkIfWinner(lastWinners, id) {
    return _.find(lastWinners, {id: id});
}

export function isItemLoaded(item) {
    if (typeof item === 'undefined' || item === null) {
        return false;
    }

    return !!(Object.keys(item).length > 0);
}