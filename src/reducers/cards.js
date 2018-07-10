import {
    CARDS_DATA_LOAD_START,
    CARDS_DATA_LOAD_END

} from '../constants/CARDS'

const initialState = {
    data: [],
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

        default:
            return state
    }
}
