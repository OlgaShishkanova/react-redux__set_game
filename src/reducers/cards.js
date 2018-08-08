import {
    CARDS_DATA_LOAD_START,
    CARDS_DATA_LOAD_END,
    CARDS_GET_RANDOM_ITEMS,
    CARDS_ADD_ITEMS,
    CARDS_REMOVE_ITEMS,
    CARDS_CHECK_SET_RIGHT,
    CARDS_CHECK_SET_WRONG,
    CARDS_SHOW_TIP,
    CARDS_GAME_END

} from '../constants/CARDS'

const initialState = {
    data: [],
    pieceOfCards: [],
    chosenCards: [],
    tipIdsOfCards: [],
    congrats: false,
    isSet: false,
    score: 0,
    mistakes: 0,
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
                pieceOfCards: [...state.pieceOfCards, ...action.payload.pieceOfCards]
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

        case CARDS_CHECK_SET_RIGHT:{

            return {
                ...state,
                score: state.score + action.payload.score,
                pieceOfCards:  action.payload.reducedData,
                chosenCards: []
            };
        }
        case CARDS_CHECK_SET_WRONG:{

            return {
                ...state,
                mistakes: state.mistakes + action.payload,
                chosenCards: []
            };
        }

        case CARDS_SHOW_TIP:{

            return {
                ...state,
                tipIdsOfCards: action.payload.ids,
                isSet: action.payload.isSet
            };
        }

        case CARDS_GAME_END:
            return {
                ...state,
                congrats: action.payload
            };



        default:
            return state
    }
}
