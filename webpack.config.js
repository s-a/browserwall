const path = require('path')

module.exports = {
	mode: 'production',
	entry: './src/BrowserWall.jsx',
	output: {
		path: path.resolve('lib'),
		filename: 'BrowserWall.js',
		libraryTarget: 'commonjs2'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				use: 'babel-loader'
			}
		]
	}
}