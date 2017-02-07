var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var stylishReporter = require('jshint-loader-stylish');

// Webpack Config
var webpackConfig = {
    devtool: 'source-map',
    entry: {
        'polyfills': './src/polyfills.browser.ts',
        'vendor': './src/vendor.browser.ts',
        'main': './src/main.browser.ts',
        'global': './src/global.js'
    },

    output: {
        path: './dist',
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ],
    resolve: {
        extensions: ['', '.js']
    },
    module: {

        loaders: [{
                test: /\.js$/,
                exclude: /node_modules\/(?!(ng2-awesome-disqus|ng2-sharebuttons)\/).*/,
                loader: 'babel-loader'
            },
            { test: /\.json$/, loader: 'json' },
            // .ts files for TypeScript
            { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
            { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.scss$/, exclude: /node_modules/, loaders: ["raw-loader", "sass-loader", "postcss-loader"] },
            // { test: /\.scss$/, exclude:/node_modules/, loaders: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")},
            //{test: /\.svg/, loader: 'svg-url-loader'},
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin 
                // loader: "url?limit=10000" 
                loader: "url"
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                loader: 'file'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    postcss: () => {
        return [
            // require('precss'),
            require('autoprefixer')
        ];
    },
    jshint: {
        reporter: stylishReporter
    }

};


// Our Webpack Defaults
var defaultConfig = {
    devtool: 'cheap-module-source-map',
    cache: true,
    debug: true,
    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        root: [path.join(__dirname, 'src')],
        extensions: ['', '.ts', '.js', '.json', '.scss']
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    },

    node: {
        global: 1,
        crypto: 'empty',
        module: 0,
        Buffer: 0,
        clearImmediate: 0,
        setImmediate: 0
    }
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);