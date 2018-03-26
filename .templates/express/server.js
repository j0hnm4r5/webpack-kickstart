require("dotenv").config();

// ========= EXPRESS =========
const express = require("express");
const app = express();

// start the server
app.listen(process.env.EXPRESS_PORT, function() {
	console.log("App listening on port " + process.env.EXPRESS_PORT + "!");
});

// ========= WEBPACK =========
const webpack = require("webpack");
var webpackConfig = require("./webpack.config");
var compiler = webpack(webpackConfig);

// use webpack-dev-middleware to serve the publicPath
app.use(
	require("webpack-dev-middleware")(compiler, {
		noInfo: true,
		publicPath: webpackConfig.output.publicPath,
	})
);

// use webpack-hot-middleware for HMR
app.use(require("webpack-hot-middleware")(compiler));
