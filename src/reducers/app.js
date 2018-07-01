import {
    LOCAL_STORAGE_GET_ITEM,
    LOCAL_STORAGE_SET_ITEM

} from '../constants/APP'


const initialState = {
    intro_name: null
};

export default function App (state = initialState, action) {

    switch (action.type) {

        case LOCAL_STORAGE_GET_ITEM:

            return {
                ...state,
                intro_name: JSON.parse(localStorage.getItem(action.payload.name))
            };

        case LOCAL_STORAGE_SET_ITEM:
            localStorage.setItem(action.payload.name, JSON.stringify(action.payload.data));
            return {
                ...state,
                intro_name: action.payload.data
            };

        default:
            return state;
    }
}
