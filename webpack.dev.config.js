const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        'react-hot-loader/patch',
        './index.tsx'
    ],
    output: {
        filename: 'bundle.js',
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
                loader: ['react-hot-loader/webpack', 'ts-loader']
            },
            {
                test: /\.scss$/,
                use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}]
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ],
    devServer: {
        historyApiFallback: true, // https://tylermcginnis.com/react-router-cannot-get-url-refresh
        hot: true
    }
};
