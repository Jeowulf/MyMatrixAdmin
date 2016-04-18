const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
require('babel-polyfill');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const common = {
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin()
    ],
};

const dev = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        './src/js/index',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'eventsource-polyfill',
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'src/js'),
            exclude: path.join(__dirname, 'node_modules'),
        }],
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"development"',
          },
          __DEVELOPMENT__: true,
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
};


const prod = {
    devtool: 'source-map',
    entry: [
        './src/js/index',
    ],
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"',
          },
          __DEVELOPMENT__: false,
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
          },
        }),
    ]
};


if (TARGET === 'start' || !TARGET) {
    module.exports = merge(dev, common);
}

if (TARGET === 'build:webpack') {
    module.exports = merge(prod, common);
}
