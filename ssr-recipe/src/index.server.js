import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import path from 'path';
import fs from 'fs';

// look up file path in asset-manifest.json
const manifest = JSON.parse(
    fs.readFileSync(path.resolve('./build/asset-manifest.json'), 'utf8')
);

// Find key that ends with chunk.js, change to script tag and join
const chunks = Object.keys(manifest.files).filter(key => /chunk\.js$/.exec(key)).map(key => `<script src="${manifest.files[key]}"></script>`).join(''); 

function createPage(root) {
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
        <link href="${manifest.files['main.css']}" rel="stylesheet" />
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">
            ${root}
        </div>
        <script src="${manifest.files['runtime-main.js']}"></script>
        ${chunks}
        <script src="${manifest.files['main.js']}"></script>
    </body>
    </html>
    `;
}

const app = express();

// function for server-side rendering
const serverRender = (req, res, next) => {
    // this function will server-side rendering instead of displaying 404
    const context = {};
    const jsx = (
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );
    const root = ReactDOMServer.renderToString(jsx); // Rendering
    res.send(createPage(root)); // respond to client
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