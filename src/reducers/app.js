import {
    LOCAL_STORAGE_SUBSCRIBE

} from '../constants/APP'


const initialState = {
    intro_name: null
};

export default function App (state = initialState, action) {

    switch (action.type) {

        case LOCAL_STORAGE_GET_ITEM:

            return {
                ...state,
                intro_name: JSON.parse(action.payload.getItem('userName'))
            };

        case LOCAL_STORAGE_SET_ITEM:

            return {
                ...state,
                intro_name: localStorage.setItem('userName', JSON.stringify(action.payload))
            };

        default:
            return state;
    }
}
