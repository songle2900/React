const nodeExternals = require('webpack-node-externals');
const paths = require('./paths');
// Option for unique className from CSS Module
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
// env variable
const webpack = require('webpack');
const getClientEnvironment = require('./env');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const publicUrl = paths.servedPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

module.exports = {
    mode: 'production', // Production mode: optimizing option activate
    entry: paths.srrIndexJs, // Entry path
    target: 'node', // node env
    output: {
        path: paths.ssrBuild, // Build path
        filename: 'server.js', // file name
        chunkFilename: 'js/[name].chunk.js', // chunk file name
        publicPath: paths.servedPath, // static file path
    },
    module: {
        rules: [
            {
                oneOf: [
                    // For JavaScript
                    {
                        test: /\.(js|mjs|jsx|ts|tsx)$/,
                        include: paths.appSrc,
                        loader: require.resolve('babel-loader'),
                        options: {
                            customize: require.resolve(
                            'babel-preset-react-app/webpack-overrides'
                            ),
                            
                            plugins: [
                            [
                                require.resolve('babel-plugin-named-asset-import'),
                                {
                                loaderMap: {
                                    svg: {
                                    ReactComponent:
                                        '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                                    },
                                },
                                },
                            ],
                            ],
                            // This is a feature of `babel-loader` for webpack (not Babel itself).
                            // It enables caching results in ./node_modules/.cache/babel-loader/
                            // directory for faster rebuilds.
                            cacheDirectory: true,
                            // See #6846 for context on why cacheCompression is disabled
                            cacheCompression: false,
                            compact: false,
                        }
                    },
                    // For CSS
                    {
                        test: cssRegex,
                        exclude: cssModuleRegex,
                        loader: require.resolve('css-loader'),
                        options: {
                            exportsOnlyLocals: true
                        }
                    },
                    // For CSS Module
                    {
                        test: cssModuleRegex,
                        loader: require.resolve('css-loader'),
                        options: {
                            modules: true,
                            exportsOnlyLocals: true,
                            getLocalIdent: getCSSModuleLocalIdent
                        }
                    },
                    // For Sass
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: [
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    exportsOnlyLocals: true
                                }
                            },
                            require.resolve('sass-loader')
                        ]
                    },
                    // For Sass + CSS Module
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: [
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    modules: true,
                                    exportsOnlyLocals: true,
                                    getLocalIdent: getCSSModuleLocalIdent
                                }
                            },
                            require.resolve('sass-loader')
                        ]
                    },
                    // For url-loader
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            emitFile: false, // file will not save
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    },
                    {
                        loader: require.resolve('file-loader'),
                        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                        options: {
                            emitFile: false,
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: ['node_modules']
    },
    externals: [nodeExternals()],
    plugins: [
        new webpack.DefinePlugin(env.stringified)
    ]
};