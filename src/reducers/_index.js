import { combineReducers } from 'redux'
import app from './app'
import form_handler from './form_handler'
import cards from './cards'

export const rootReducer = combineReducers({
   app,
    form_handler,
    cards
});
