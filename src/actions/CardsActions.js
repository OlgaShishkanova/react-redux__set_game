import {
    CARDS_DATA_LOAD_START,
    CARDS_DATA_LOAD_END,
    CARDS_GET_RANDOM_CARDS

} from '../constants/CARDS'

import axios from 'axios';


export function loadCardsData (mode) {
    return (dispatch) => {
        dispatch({
            type: CARDS_DATA_LOAD_START
        });

        axios.get("/api/getdata", {
            params: {
                mode: mode
            }
        })
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

export function getRandomCards(number) {
    return (dispatch, getState) => {

        const {data} = getState().cards;
        let setOfCards = [];
        let removeFromData = [];

        Array.from(number).forEach((item) => {
            let rand = data[Math.floor(Math.random() * data.length)];
            removeFromData = data.filter(el => el !== rand);
            setOfCards = [...setOfCards, rand];
            console.log(item)
        });

        console.log(setOfCards, removeFromData);


        dispatch({
            type: CARDS_GET_RANDOM_CARDS,
            payload: setOfCards
        })
    }
}
