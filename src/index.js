import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './containers/App/App';
import './styles.scss';

// main app

const store = configureStore();
console.log('Начальный Redux Store', store.getState());

const renderApp = () => {
    render(
            <Provider store={store}>
                <App />
            </Provider>,
        document.getElementById('root')
    )
};

renderApp(App);