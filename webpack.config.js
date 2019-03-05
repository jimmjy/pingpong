const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: './dist',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				],
			},
			{
				test: /\.(css|scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [
								require('autoprefixer')({
									browsers: ['> 1%', 'last 2 versions'],
								}),
							],
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: './images',
							name: '[contenthash].[ext]',
							publicPath: '../images',
						},
					},
				],
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						// minimize: true,
						attrs: ['img:src', 'link:href'],
					},
				},
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		//uses our html file and outputs a copy with js inserted into it for us
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'styles/[contenthash].css',
		}),
	],
};
