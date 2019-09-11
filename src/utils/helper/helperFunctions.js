import {MESSAGES} from "../../constants/messages";
import Cookies from 'universal-cookie';
import * as _ from "lodash";
import {isEmpty} from "lodash";

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
    let max = 56;

    while (lotteryNumber.length < 6) {
        let randNumber = Math.floor(Math.random() * 100) + 1;

        if (randNumber < (max + 1) && lotteryNumber.indexOf(randNumber) === -1) {
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

export function isNumberPickedCorrectly(pickedNumbers) {
    let bool = true;
    _.forEach(pickedNumbers, function (item, key) {
        if (bool) {
            if (typeof item !== 'number') {
                bool = false;
            }
        }
    });

    return bool;
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

export function inAppCoin(coins, withUnit = true) {
    let amountInCurrency = parseFloat(coins) + " coins";

    // If coin not set or undefined or empty. Skip for 0
    if (! coins && coins !== 0) {
        return "";
    }

    return amountInCurrency;

}

export function inCurrency(coins, withUnit = true) {
    let amountInCurrency = 0;

    // If coin not set or undefined or empty. Skip for 0
    if (! coins && coins !== 0) {
        return "";
    }

    try {
        const currencies = JSON.parse(localStorage.getItem("currencies"));
        const settings = JSON.parse(localStorage.getItem("settings"));
        const appCurrency = _.find(settings, function(o) { return o.key === "app_currency"; });
        const appCurrencyDetail = _.find(currencies, {currency: appCurrency.value});

        amountInCurrency =  parseFloat((coins / appCurrencyDetail.value_in_app_coin).toFixed(9));
        if (withUnit) {
            amountInCurrency += " " + appCurrency.value;
        }
    } catch (err) {
        // console.log('currency conversion error', err);
    }


    return amountInCurrency;

}

export function inCoin(currency, withUnit = true) {
    let amountInCoin = 0;

    // If currency not set or undefined or empty. Skip for 0
    if (! currency && currency !== 0) {
        return "";
    }


    if (! currency) {
        return "";
    }

    try {
        const currencies = JSON.parse(localStorage.getItem("currencies"));
        const settings = JSON.parse(localStorage.getItem("settings"));
        const appCurrency = _.find(settings, function(o) { return o.key === "app_currency"; });
        const appCurrencyDetail = _.find(currencies, {currency: appCurrency.value});

        amountInCoin = (currency * appCurrencyDetail.value_in_app_coin);

        if (withUnit) {
            amountInCoin += " coins";
        }
    } catch (err) {
        // console.log('currency conversion error', err);
    }


    return amountInCoin;

}

// stripslashes
export function stripslashes(str) {
    return str.replace(/\\'/g,'\'').replace(/\"/g,'"').replace(/\\\\/g,'\\').replace(/\\0/g,'\0');
}

// get by slug
export function getBySlug(collection, slug) {
    let item = _.find(collection, {slug: slug});
    return item ? item : {};
}

export function toggleItemInArray(itemsArray, item) {
    let arr = itemsArray && itemsArray.length > 0 ? itemsArray : [];

    let index = arr.indexOf(item);
    if (index > -1) {
        arr.splice(index, 1);
    } else {
        arr.push(item);
    }

    return arr;
}

export function getPlayerDisplayName(player) {
    if (! isEmpty(player.nickname)) {
        return player.nickname;
    }

    if (! isEmpty(player.username)) {
        return player.username;
    }

    if (! isEmpty(player.full_name)) {
        return player.full_name;
    }

    return "";
}