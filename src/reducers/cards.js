import {
    CARDS_DATA_LOAD_START,
    CARDS_DATA_LOAD_END,
    CARDS_GET_RANDOM_ITEMS,
    CARDS_ADD_ITEMS,
    CARDS_REMOVE_ITEMS
    //CARDS_CHECK_SET

} from '../constants/CARDS'

const initialState = {
    data: [],
    pieceOfCards: [],
    chosenCards: [],
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

        case CARDS_ADD_ITEMS:{

            return {
                ...state,
                chosenCards: [...state.chosenCards, action.payload]
            };
        }

        case CARDS_REMOVE_ITEMS:{

            return {
                ...state,
                chosenCards: state.chosenCards.filter(i => i.id !== action.payload.id)
            };
        }


        default:
            return state
    }
}
