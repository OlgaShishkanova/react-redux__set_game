import { combineReducers } from 'redux'
import app from './app'
import form_handler from './form_handler'

export const rootReducer = combineReducers({
   app,
    form_handler
});
