const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	plugins: [
		new HtmlWebpackPlugin({
			appMountId: "app",
			minify: {
				collapseWhitespace: true,
				preserveLineBreaks: true,
			},
			inject: false, // required
			template: require("html-webpack-template"), // required
		}),
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

	devServer: {
		contentBase: "./dist",
		port: 8000,
		open: false,
	},
	devtool: "eval-source-map",
	stats: "minimal",
	mode: "development",
};
