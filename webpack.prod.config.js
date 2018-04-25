const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    // devtool: 'source-map',
    entry: [
        './index.tsx'
    ],
    output: {
        filename: '[name].[chunkhash:8].js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist')
    },
    context: path.resolve(__dirname, 'src'),
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'json', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader'})
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.[chunkhash].js',
            minChunks(module) {
                return module.context && module.context.indexOf('node_modules') >= 0;
            }
        }),
        new ExtractTextPlugin('[name].[contenthash:8].css'),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'index.html'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                screw_ie8: true, // React doesn't support IE8
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        }),
        new CopyWebpackPlugin([
            {
                from: '.htaccess',
                to: '.htaccess',
                toType: 'file'
            },
        ])
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        // "react": "React",
        // "react-dom": "ReactDOM"
    },
};
