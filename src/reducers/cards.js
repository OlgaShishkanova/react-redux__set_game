import {
    CARDS_DATA_LOAD_START,
    CARDS_DATA_LOAD_END,
    CARDS_GET_RANDOM_ITEMS

} from '../constants/CARDS'

const initialState = {
    data: [],
    pieceOfCards: [],
    isAjax: false,
    empty: true
};

export default function Cards (state = initialState, action) {
    switch (action.type) {

        case CARDS_DATA_LOAD_START:
            return { ...state, isAjax: true };

        case CARDS_DATA_LOAD_END:
            return {
                ...state,
                data: action.payload,
                isAjax: false,
                empty: false
            };

        case CARDS_GET_RANDOM_ITEMS:
            return { ...state,
                data: action.payload.reducedData,
                pieceOfCards: action.payload.pieceOfCards
            };

        default:
            return state
    }
}
