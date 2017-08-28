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
            'webpack-dev-server/client?https://localhost:3000',
            'webpack/hot/only-dev-server',
            'index.js'
        ],
        jquery: 'jquery'
    },
    output: {
        path: BUILD_PATH,
        filename: "[name].bundle.js"
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
                    "transform-runtime"
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
    plugins:  [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'client/index.ejs'),
            production: false,
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new CopyWebpackPlugin([
            // Copy schemas to build directory
            { from: path.join(__dirname, 'client/styles/loading.css'), to: 'styles/loading.css' },
            { from: path.join(__dirname, 'client/custom'), to: 'custom' },
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'node-static',
            filename: 'node-static.js',
            minChunks(module, count) {
                var context = module.context;
                return context && context.indexOf('node_modules') >= 0;
            },
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
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

function isExternalModule(module) {
    var userRequest = module.userRequest;

    if (typeof userRequest !== 'string') {
        return false;
    }

    return userRequest.indexOf('node_modules') >= 0;
}
