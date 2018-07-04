import {
    CARDS_DATA_LOAD_START,
    CARDS_DATA_LOAD_END

} from '../constants/CARDS'

import axios from 'axios';


export function loadCardsData () {
    return (dispatch) => {
        dispatch({
            type: CARDS_DATA_LOAD_START
        });

        axios.get("/api/getdata")
            .then((response) => {
                dispatch({
                    type: CARDS_DATA_LOAD_END,
                    payload: response.data
                });
        })
            .catch((error) => {
                if (error.response) {
                    console.log([error.response.data,
                        error.response.status,
                        error.response.headers]);
                }else {
                    console.log('Error', error.message);
                }

            })
    }
}
