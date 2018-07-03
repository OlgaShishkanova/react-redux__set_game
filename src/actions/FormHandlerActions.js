import {
    CHANGE_FORM_FIELD,
    CLEAR_FORM
} from '../constants/FORM_HANDLER'


export function changeField(name, data) {
    return (dispatch) => {
        dispatch({
            type: CHANGE_FORM_FIELD,
            payload: {name, data}
        })
    }
}

export function clearForm() {
    return (dispatch) => {
        dispatch({
            type: CLEAR_FORM
        })
    }
}
