export const DEFAULT_APP_STATUS = {
    modal: null,
    settings: [{}],
    currencies: [{}]
};

export const DEFAULT_LOTTERY_STATE = {
    winners: {
        data: ["", "", "", "", "", "", "", "", "", "" ],
        meta: {},
        links: {}
    },
    slot: {
    },
    lastSlot: {
        winners: []
    },
    players: {
        data: []
    },
    result: []
};

export const DEFAULT_MY_STATE = {
    playedGames: {},
    transactions: {},
    profile: {},
    withdrawRequests: {}
};

export const DEFAULT_PAGE_STATE = {
    pages: []
};