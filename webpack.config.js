const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const BUILD_PATH = path.join(__dirname, 'build');

module.exports = {
    devtool: 'source-map',
    context: __dirname,
    entry: {
        app: [
            'webpack-dev-server/client?https://0.0.0.0:8080',
            'webpack/hot/only-dev-server',
            'index.js'
        ],
        vendor: [
            "ajv",
            "antd",
            "draft-js",
            "draftjs-to-html",
            "es6-promise",
            "es6-template-strings",
            "golden-layout",
            "isomorphic-fetch",
            "jquery",
            "jwt-decode",
            "lodash",
            "moment",
            "object-assign",
            "object-hash",
            "prop-types",
            "pubsub-js",
            "react",
            "react-codemirror",
            "react-dnd",
            "react-dom",
            "react-edit",
            "react-redux",
            "react-router",
            "react-router-breadcrumbs",
            "react-router-redux",
            "react-window-resize-listener",
            "redux",
            "redux-polyglot",
            "redux-saga",
            "store",
            "xml-js"
        ]
    },
    output: {
        path: BUILD_PATH,
        filename: "[name].js",
        chunkFilename: '[id].[chunkhash].js'
    },

    module: {
        loaders: [{
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.html$/,
            use: {
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]'
                }
            }
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.(js|jsx)$/,
            include: [
                path.resolve(__dirname, 'client')
            ],
            loader: 'babel-loader',
            query: {
                babelrc: false,
                presets: [
                    "es2015",
                    "stage-0",
                    "react",
                    "react-hmre"
                ],
                plugins: [
                    "transform-object-rest-spread",
                    "transform-regenerator",
                    "transform-export-extensions",
                    "transform-runtime",
                    "transform-class-properties"
                ]
            }
        }, {
            test: /\.(gif|png|jpg|jpeg|svg)(\?[a-z0-9]+)?$/,
            use: 'file-loader'
        }, {
            test: /\.(woff|woff2|eot|ttf)$/,
            loader: 'url-loader?limit=100000'
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            path.join(__dirname, 'client'),
            'node_modules'
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //   minimize: true,
        //   sourcemap: true
        // }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'client/index.ejs'),
            production: false,
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new CopyWebpackPlugin([
            // Copy schemas to build directory
            {
                from: path.join(__dirname, 'client/styles/loading.css'),
                to: 'styles/loading.css'
            }, {
                from: path.join(__dirname, 'client/custom'),
                to: 'custom'
            }, {
                from: path.join(__dirname, 'documentation.html'),
                to: 'documentation.html'
            },
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
        }),
        // new webpack.optimize.AggressiveSplittingPlugin({
        //     minSize: 30000,
        //     maxSize: 50000
        // }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            React: "react",
            ReactDOM: "react-dom"
        })
    ],
    devServer: {
        contentBase: './build',
        historyApiFallback: true,
        port: 8080,
        hot: true,
        compress: false,
        stats: {
            colors: true
        }
    }
};