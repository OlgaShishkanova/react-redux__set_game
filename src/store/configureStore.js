import { createStore } from 'redux'
import { rootReducer } from '../reducers/_index'

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/_index', () => {
            const nextRootReducer = require('../reducers/_index').rootReducer;
            store.replaceReducer(nextRootReducer)
        })
    }


    return store
}