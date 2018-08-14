import {
    CARDS_DATA_LOAD_START,
    CARDS_DATA_LOAD_END,
    CARDS_GET_RANDOM_ITEMS,
    CARDS_ADD_ITEMS,
    CARDS_REMOVE_ITEMS,
    CARDS_CHECK_SET_RIGHT,
    CARDS_CHECK_SET_WRONG,
    CARDS_SHOW_TIP,
    CARDS_GAME_END

} from '../constants/CARDS'

import {ACTION_CARDS_LOAD} from '../constants/API'

import axios from 'axios';


export function loadCardsData (mode) {
    return (dispatch) => {
        dispatch({
            type: CARDS_DATA_LOAD_START
        });

        axios.get(ACTION_CARDS_LOAD, {
            params: {
                mode: mode
            }
        })
            .then((response) => {
                dispatch({
                    type: CARDS_DATA_LOAD_END,
                    payload: response.data
                });
        }).then (() =>{
            this.getRandomCards(12);
        }).catch((error) => {
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

export function getTip(finish) {
    return (dispatch, getState) => {

        let pieceOfCards = getState().cards.pieceOfCards;
        let arrOfItems = [pieceOfCards[0].colors ? 'colors': 'images', 'number', 'form', 'fullness'];
        let result = [];
        let data = getState().cards.data;
        let ids = [];
        let arrTriplets = [];

        //make all possible triplets of cards
        for (let i = 0; i < pieceOfCards.length - 2; i++) {
            for (let j = i + 1; j < pieceOfCards.length - 1; j++) {
                for (let k = j + 1; k < pieceOfCards.length; k++){
                    arrTriplets = [...arrTriplets, [pieceOfCards[i], pieceOfCards[j], pieceOfCards[k]]]
                }
            }
        }

        //compare features in each triplets
       loopLabel: for (let triplet of arrTriplets) {
                result = [];
                for (let feature of arrOfItems) {

                    if (triplet[0][feature] === triplet[1][feature] && triplet[1][feature] === triplet[2][feature]) {
                        result = [...result, true];
                    } else if (triplet[0][feature] !== triplet[1][feature]
                        && triplet[1][feature] !== triplet[2][feature]
                        && triplet[0][feature] !== triplet[2][feature]) {
                        result = [...result, true];
                    } else {
                        break;
                    }
                    if (result.length === 4) {
                        ids = [triplet[0].id, triplet[1].id, triplet[2].id];

                        break loopLabel;
                    }
                }
        }
        if(ids.length === 0 && data.length !== 0){
           let isSet = false;
            dispatch({
                type: CARDS_SHOW_TIP,
                payload: {ids, isSet}
            })
            //check if there is more sets or no
        }else if(ids.length === 0 && finish) {
            dispatch({
                type: CARDS_GAME_END,
                payload: true
            })
        }else if(ids.length !== 0 && finish){
            dispatch({
                type: CARDS_GAME_END,
                payload: false
            })
        } else {
            let isSet = true;
            dispatch({
                type: CARDS_SHOW_TIP,
                payload: {ids, isSet}
            })
        }

    }
}

export function checkSet() {
    return (dispatch, getState) => {

        let chosenCards = getState().cards.chosenCards;
        let pieceOfCards = getState().cards.pieceOfCards;
        let data = getState().cards.data;
        let arrOfItems = [chosenCards[0].colors ? 'colors': 'images', 'number', 'form', 'fullness'];
        let result = [];

        for (let item of arrOfItems) {
            if(chosenCards[0][item] === chosenCards[1][item]
                && chosenCards[1][item] === chosenCards[2][item]) {
                result = [...result, true]
            }
            if(chosenCards[0][item] !== chosenCards[1][item]
                && chosenCards[1][item] !== chosenCards[2][item]
                && chosenCards[0][item] !== chosenCards[2][item]) {
                result = [...result, true]
            }
        }

        if(result.length === 4) {

            dispatch({
                type: CARDS_CHECK_SET_RIGHT,
                payload: {score: 1, reducedData: removeCardsOfRightSet(getState)}
            });
            if(data.length>=3 && pieceOfCards.length<15){
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

