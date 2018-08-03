import {
    CARDS_DATA_LOAD_START,
    CARDS_DATA_LOAD_END,
    CARDS_GET_RANDOM_ITEMS,
    CARDS_ADD_ITEMS,
    CARDS_REMOVE_ITEMS,
    CARDS_CHECK_SET_RIGHT,
    CARDS_CHECK_SET_WRONG,
    CARDS_SHOW_TIP

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

        let pieceOfCards = [];
        let reducedData = [...getState().cards.data];
        let arr = [...Array(number).keys()];

        arr.forEach(() => {
            let randNumber = Math.floor(Math.random() * reducedData.length);
            let rand = reducedData.splice(randNumber, 1)[0];
            pieceOfCards = [...pieceOfCards, rand];
        });

        dispatch({
            type: CARDS_GET_RANDOM_ITEMS,
            payload: {pieceOfCards, reducedData}
        })
    }
}

export function toggleCards(item) {
    return (dispatch, getState) => {

        let chosenCards = getState().cards.chosenCards;

       if(chosenCards.find( i => i.id === item.id )){
           dispatch({
               type:  CARDS_REMOVE_ITEMS,
               payload: item
           })
       }else {
           dispatch({
               type: CARDS_ADD_ITEMS,
               payload: item
           })
       }
    }
}

export function removeCardsOfRightSet(getState) {


    let pieceOfCards = getState().cards.pieceOfCards;
    let chosenCards = getState().cards.chosenCards;

    chosenCards.map((item) => {
        pieceOfCards = pieceOfCards.filter(i => i.id !== item.id);
    });
    return pieceOfCards
}

export function getTip() {
    return (dispatch, getState) => {

        let pieceOfCards = getState().cards.pieceOfCards;
        let arrOfItems = [pieceOfCards[0].colors ? 'colors': 'images', 'number', 'form', 'fullness'];
        let ids = [];
        let prevCards = {};

        pieceOfCards.reduce((accumulator, currentValue) => {
            let result = [];

            if(result.length<4){
                arrOfItems.forEach((item) => {
                    if (accumulator[item] === currentValue[item] &&  currentValue[item] === prevCards[item]) {
                        console.log('все равно', accumulator[item], currentValue[item], prevCards[item]);
                        result = [...result, true]
                    }

                    if (accumulator[item] !== currentValue[item]) {
                        if (prevCards[item] !== undefined && prevCards[item] !== currentValue[item]) {
                            if (prevCards[item] !== undefined && prevCards[item] !== accumulator[item]) {
                                console.log('все неравно', accumulator[item], currentValue[item], prevCards[item]);
                                result = [...result, true]
                            }
                        }
                    }
                });
            }
            prevCards = accumulator;
            console.log(result.length);
            if(result.length===4){
                ids = [accumulator.id, currentValue.id, prevCards.id];
            }
            return currentValue;
        });

        dispatch({
            type: CARDS_SHOW_TIP,
            payload: ids
        })
    }
}

export function checkSet() {
    return (dispatch, getState) => {

        let chosenCards = getState().cards.chosenCards;
        let pieceOfCards = getState().cards.pieceOfCards;
        let data = getState().cards.data;
        let arrOfItems = [chosenCards[0].colors ? 'colors': 'images', 'number', 'form', 'fullness'];
        let result = [];

        arrOfItems.forEach((item) => {
            if(chosenCards[0][item] === chosenCards[1][item]){
                if(chosenCards[1][item] === chosenCards[2][item]){
                    result = [...result, true]
                }
            }
            if(chosenCards[0][item] !== chosenCards[1][item]){
                if(chosenCards[1][item] !== chosenCards[2][item]){
                    if(chosenCards[0][item] !== chosenCards[2][item]){
                        result = [...result, true]
                    }
                }
            }
        });

        if(result.length === 4) {

            dispatch({
                type: CARDS_CHECK_SET_RIGHT,
                payload: {score: 1, reducedData: removeCardsOfRightSet(getState)}
            });
            if(data.length>3 && pieceOfCards.length<15){
                this.getRandomCards(3);
            }

        }else{
            dispatch({
                type: CARDS_CHECK_SET_WRONG,
                payload: 1
            })
        }

    }
}

