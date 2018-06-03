import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { AppContainer } from 'react-hot-loader'
import App from './containers/App/App';
import './styles.scss';

// main app

const store = configureStore();
console.log('Начальный Redux Store', store.getState());

const renderApp = () => {
    render(
        <AppContainer warnings={false}>
            <Provider store={store}>
                <App />
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    )
};

renderApp(App);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./containers/App/App', () => {
        renderApp(App)
    })
}
