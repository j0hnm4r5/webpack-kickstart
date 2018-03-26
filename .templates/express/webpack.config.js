const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
	entry: [
		"./src/index.js",
		"webpack-hot-middleware/client?path=/__webpack_hmr&reload=true",
	],
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
	},
	plugins: [
		new CleanWebpackPlugin(["dist"]),
		new HtmlWebpackPlugin({
			appMountId: "app",
			minify: {
				collapseWhitespace: true,
				preserveLineBreaks: true,
			},
			inject: false, // required
			template: require("html-webpack-template"), // required
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new CopyWebpackPlugin([
			{
				from: "./src/assets",
				to: "./assets",
			},
		]),
		new Dotenv(),
	],
	module: {
		rules: [
			{
				// ES2015
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["babel-preset-env"],
					},
				},
			},
			{
				// Styles
				test: /\.(s*)css$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
	devtool: "eval-source-map",
	stats: "minimal",
	mode: "development",
};
