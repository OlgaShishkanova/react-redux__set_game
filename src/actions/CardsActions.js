import {
    CARDS_DATA_LOAD_START,
    CARDS_DATA_LOAD_END,
    CARDS_GET_RANDOM_ITEMS,
    CARDS_ADD_ITEMS,
    CARDS_REMOVE_ITEMS
    //CARDS_CHECK_SET

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

export function checkSet() {
    return (dispatch, getState) => {

        let chosenCards = getState().cards.chosenCards;

        if(chosenCards[0].colors === chosenCards[1].colors && chosenCards[1].colors === chosenCards[2].colors
            // && (а по остальным признакам должны быть неравны или тоже равны)
            //надо короч перебирать все свойства и если у 1 и 2 они равны, то и у 3го должно быть такое же, если
                // 1 и 2 не равны, то и 3 не должен быть
            || chosenCards[0].number === chosenCards[1].number && chosenCards[1].number === chosenCards[2].number
            || chosenCards[0].form === chosenCards[1].form && chosenCards[1].form === chosenCards[2].form
            || chosenCards[0].fullness === chosenCards[1].fullness && chosenCards[1].fullness === chosenCards[2].fullness
            ||
            (chosenCards[0].colors !== chosenCards[1].colors && chosenCards[1].colors !== chosenCards[2].colors && chosenCards[0].colors !== chosenCards[2].colors
            && chosenCards[0].number !== chosenCards[1].number && chosenCards[1].number !== chosenCards[2].number && chosenCards[0].number !== chosenCards[2].number
            && chosenCards[0].form !== chosenCards[1].form && chosenCards[1].form !== chosenCards[2].form && chosenCards[0].form !== chosenCards[2].form
            && chosenCards[0].fullness !== chosenCards[1].fullness && chosenCards[1].fullness !== chosenCards[2].fullness && chosenCards[0].fullness !== chosenCards[2].fullness
            )
        ){
            console.log('правильно епта')
        }else{
            console.log('неправильно, уеба')
        }


        // chosenCards.forEach((item) => {
        //
        // });
    }
}

