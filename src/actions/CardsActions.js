import {
    CARDS_DATA_LOAD_START,
    CARDS_DATA_LOAD_END,
    CARDS_GET_RANDOM_ITEMS

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

        //const {data} = getState().cards;
        let pieceOfCards = [];
        let reducedData = [...getState().cards.data];
        let arr = [...Array(number).keys()];

        arr.forEach(() => {
            let rand = reducedData[Math.floor(Math.random() * reducedData.length)];
            reducedData = reducedData.filter(el => el !== rand);
            pieceOfCards = [...pieceOfCards, rand];
        });

        console.log(pieceOfCards, reducedData);


        dispatch({
            type: CARDS_GET_RANDOM_ITEMS,
            payload: {pieceOfCards, reducedData}
        })
    }
}
