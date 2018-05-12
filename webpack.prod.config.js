const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GenerateAssetWebpackPlugin = require('generate-asset-webpack-plugin');
const path = require('path');

// Update the value below if you would like to run the app in a sub folder. It must start and end with "/" i.e "/path/to/sub/folder/"
const BASENAME = '/';

function getHtaccessContent() {
    return 'RewriteEngine on\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteRule ^(.*)$ index.html?q=$1 [L,QSA]';
}

module.exports = {
    entry: [
        './index.tsx'
    ],
    output: {
        filename: '[name].[chunkhash:8].js',
        publicPath: BASENAME,
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
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{loader: 'css-loader'}, {loader: 'sass-loader'}], fallback: 'style-loader'
                })
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 1000, // Convert images < 1kb to base64 strings
                        name: 'images/[name].[hash:8].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[contenthash:8].css'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                BASENAME: JSON.stringify(BASENAME)
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.[chunkhash].js',
            minChunks(module) {
                return module.context && module.context.indexOf('node_modules') >= 0;
            }
        }),
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
        new GenerateAssetWebpackPlugin({
            filename: '.htaccess',
            fn: (compilation, cb) => {
                cb(null, getHtaccessContent());
            }
        })
    ]
};
