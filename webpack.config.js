const path = require('path');
const { DefinePlugin, LoaderOptionsPlugin, optimize } = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

const NODE_ENV = process.env.NODE_ENV || '';
const isProduction = NODE_ENV === 'production';

const productionPlugins = [
    new LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
    new optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
            screw_ie8: true,
            keep_fnames: true
        },
        compress: {
            screw_ie8: true
        },
        comments: false
    })
];

const devPlugins = [
    new WebpackNotifierPlugin(),
    new DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(NODE_ENV)
        }
    }),
];

module.exports = {
    entry: {
        'application': './client/index.js',
    },
    output: {
        path: path.resolve(`${__dirname}/dist`),
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['.js'],
        modules: [path.resolve(`${__dirname}/client/src/`), 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
        ]
    },
    devtool: isProduction ? '' : 'eval',
    plugins: isProduction ? productionPlugins.concat(devPlugins) : devPlugins,
};
