import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from '../reducers/_index'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

export default function configureStore() {


    // const store = createStore(
    //     rootReducer,
    //     applyMiddleware(thunk)
    // );
    let initialState = window.__INITIAL_STATE__;

    const store = compose(
        applyMiddleware(thunkMiddleware),
        applyMiddleware(createLogger()),
    )(createStore)(rootReducer, Object.assign({}, initialState));


    return store
}