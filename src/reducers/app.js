import {
    LOCAL_STORAGE_SUBSCRIBE

} from '../constants/APP'


const initialState = {
    name: ''
};

export default function App (state = initialState, action) {

    switch (action.type) {

        case LOCAL_STORAGE_SUBSCRIBE:

            return {
                ...state,
                name: JSON.parse(action.payload.getItem('userName'))
            };

        default:
            return state;
    }
}
