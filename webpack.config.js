var path = require('path');
var webpack = require('webpack');
var PROD = JSON.parse(process.env.PROD_DEV || "0");

module.exports = {
    entry: './app.jsx',
    devtool: !PROD ? 'source-map' : undefined,
    output: {
        path: './dist',
        filename: 'bundle.min.js',
        sourceMapFilename: '[name].js.map'
    },
    publicPath: './dist',
    devServer: {
        inline: true,
        contentBase: './dist'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        })
    ],

    module: {
        loaders: [
            {
                test: /.+.jsx?$/,
                exclude: /node_modules|gulpfile.js/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {test: /\.(jpg|png|svg)$/, loader: "url?limit=8192"},
            {test: /\.css$/, loader: "style!css"}
        ]
    }
};
