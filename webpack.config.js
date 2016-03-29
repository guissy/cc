/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var path = require('path');
var webpack = require('webpack');
var helpers = require('./helpers');
var CopyWebpackPlugin  = require('copy-webpack-plugin');
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var ENV = process.env.ENV = process.env.NODE_ENV = 'development';

var metadata = {
    title: 'Angular2 Webpack Starter by @gdi2990 from @AngularClass',
    baseUrl: '/',
    host: 'localhost',
    port: 8080,
    ENV: ENV
};
module.exports = {
    metadata: metadata,
    devtool: 'source-map',
    debug: true,
    // entry: './src/index',
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'main': './src/index.ts'
    },
    // output: {
    //     path: __dirname + "/dist",
    //     publicPath: "dist/",
    //     filename: "bundle.js"
    // },
    // Config for our build files
    output: {
        path: helpers.root('dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },
    resolve: {
        // ensure loader extensions match
        extensions: prepend(['.ts','.js','.json','.css','.scss','.html'], '.async') // ensure .async.ts etc also works
    },
    module: {
        loaders: [
            {test: /\.ts$/,loaders:['ts-loader'],exclude:/node_modules/},
            {test: /\.scss$/,loader:'style!css!sass',exclude:/node_modules/},
            {test: /\.jpe?g$|\.png$|\.gif$|\.svg$|\.woff$|\.ttf$/,loaders:['file'],exclude:/node_modules/},
            {test: /\.html$/,  loader: 'raw-loader', exclude: [ root('src/index.html') ] }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({ name: 'polyfills', filename: 'polyfills.bundle.js', minChunks: Infinity }),
        // static assets
        new CopyWebpackPlugin([ { from: 'src/assets', to: 'assets' } ]),
        // generating html
        new HtmlWebpackPlugin({ template: 'src/index.html' }),
        // replace
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(metadata.ENV),
                'NODE_ENV': JSON.stringify(metadata.ENV)
            }
        })
    ],
    devServer: {
        port: metadata.port,
        host: metadata.host,
        // contentBase: 'src/',
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    },
};

// Helper functions

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}
function prepend(extensions, args) {
    args = args || [];
    if (!Array.isArray(args)) { args = [args] }
    return extensions.reduce(function(memo, val) {
        return memo.concat(val, args.map(function(prefix) {
            return prefix + val
        }));
    }, ['']);
}