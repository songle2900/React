import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import { loadableReady } from '@loadable/component';

// apply saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    window.__PRELOADED_STATE__, 
    applyMiddleware(thunk, sagaMiddleware)
);

// run saga middleware
sagaMiddleware.run(rootSaga);

// Group content to render into a single component for easy reuse of the same content
const Root = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
};

const root = document.getElementById('root');

// use loadableReady & hydrate when production
if (process.env.node_env === 'production') {
    loadableReady(() => {
        ReactDOM.hydrate(<Root />, root);
    });
 } else {
     ReactDOM.render(<Root />, root);
 }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
