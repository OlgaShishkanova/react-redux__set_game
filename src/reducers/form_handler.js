import {
    CHANGE_FORM_FIELD,
    CLEAR_FORM
} from '../constants/FORM_HANDLER'

const initialState = {
    name: {
        value: ''
    }
};

export default function FormHandler (state = initialState, action) {
    switch (action.type) {

        case CHANGE_FORM_FIELD:
            return {
                ...state,
                [action.payload.name]: {
                    ...state[action.payload.name],
                    ...action.payload.data
                }
            };

        case CLEAR_FORM:
            return initialState;

        default:
            return state
    }
}
