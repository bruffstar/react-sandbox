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
		publicPath: "/",
		path: path.resolve(__dirname, "dist")
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
				test: /\.css$/,
				loader: ['style-loader', 'css-loader']
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
		//Enable this if you want to never refresh (this allows hot-reloading app.tsx, but won't auto-refresh if you change index.tsx)
		//hotOnly: true
	}
};
