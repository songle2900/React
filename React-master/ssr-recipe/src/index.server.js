import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import path from 'path';
import fs from 'fs';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import PreloadContext from './lib/PreloadContext';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

// look up file path in asset-manifest.json
const statsFile = path.resolve('./build/loadable-stats.json');

function createPage(root, tags) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta 
            name="viewport" 
            content="width=device-width,initial-scale=1,shrink-to-fit=no" 
        />
        <meta name="theme-color" content="#000000" />
        <title>React App</title>
        ${tags.styles}
        ${tags.links}
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">
            ${root}
        </div>
        ${tags.scripts}
    </body>
    </html>
    `;
}

const app = express();

// function for server-side rendering
const serverRender = async (req, res, next) => {
    // this function will server-side rendering instead of displaying 404
    const context = {};
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducer, 
        applyMiddleware(thunk, sagaMiddleware)
    );

    // toPromise: convert task from sagaMiddleware.run to Promise
    const sagaPromise = sagaMiddleware.run(rootSaga).toPromise();

    const preloadContext = {
        done: false,
        promises: []
    };

    // ChunkExtractor
    const extractor = new ChunkExtractor({ statsFile });

    const jsx = (
        <ChunkExtractorManager extractor={extractor}>
            <PreloadContext.Provider value={preloadContext}>
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        <App />
                    </StaticRouter>
                </Provider>
            </PreloadContext.Provider>
        </ChunkExtractorManager>
    );

    ReactDOMServer.renderToStaticMarkup(jsx); // Rendering
    store.dispatch(END); // redux-saga END: all sagas will be end
    try {
        await sagaPromise; // wait for on-going saga till finish
        await Promise.all(preloadContext.promises); // wait for all promises
    } catch (e) {
        return res.status(500);
    }
    preloadContext.done = true;

    const root = ReactDOMServer.renderToString(jsx); // rendering

    // https://redux.js.org/recipes/server-rendering#security-considerations
    const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
    // inject redux state
    const stateScript = `<script>__PRELOADED_STATE__ = ${stateString}</script>`;

    // extract preload style/script,
    const tags = {
        // put redux state in front of script
        scripts: stateScript + extractor.getScriptTags(),
        links: extractor.getLinkTags()
    };

    res.send(createPage(root, tags)); // respond to client
};

const serve = express.static(path.resolve('./build'), {
    index: false    // index.html will not show in "/" path
});

app.use(serve); // has to be before serverRender
app.use(serverRender);

// Run server with 5000 port
app.listen(5000, () => {
    console.log('Running on http://localhost:5000');
});