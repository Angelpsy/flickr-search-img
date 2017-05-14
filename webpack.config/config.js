const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const paths = require('./paths');

module.exports = function(env) {
    env = env || {};
    const isServer = !!env.server;
    const isProd = require('./env') === 'production';
    return ({
        context: paths.src,
        entry: {
            index: path.join(paths.src, 'index.js')
        },
        output: {
            filename: isProd ? '[name].[chunkhash].js' : '[name].js',
            path: path.join(isProd ? paths.build : paths.dev, 'assets'),
            publicPath: 'assets',
            sourceMapFilename: '[name].map'
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                'Vue': 'vue',
            },
            modules: ['node_modules'],
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader?sourceMap',
                        use: ['css-loader?sourceMap', 'postcss-loader?sourceMap']
                    }),
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            css: ExtractTextPlugin.extract({
                                use: 'css-loader?sourceMap',
                                fallback: 'vue-style-loader?sourceMap'
                            })
                        }
                    }
                },
                {
                    test: /\.svg$/,
                    loader: 'url-loader',
                    query: {
                        name: './img/svg/[name]' + (isProd ? '.[hash]' : '') + '.[ext]',
                        outputPath: './',
                        publicPath: './',
                        emitFile: true,
                        useRelativePath: false,
                        limit: isServer ? 1000000000 : 4000
                    }
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "url-loader",
                    query: {
                        mimetype: 'application/font-woff',
                        outputPath: './',
                        publicPath: './',
                        emitFile: true,
                        useRelativePath: false,
                        limit: isServer ? 1000000000 : 4000
                    }
                },
                {
                    test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "url-loader",
                    query: {
                        outputPath: './',
                        publicPath: './',
                        emitFile: true,
                        useRelativePath: false,
                        limit: isServer ? 1000000000 : 4000
                    }
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(isProd ? paths.build : paths.dev, {
                root: paths.projsect,
                exclude: isServer ? [ 'index.html'] : null,
                verbose: isServer,
            }),
            new HtmlWebpackPlugin({
                template: path.join(paths.src, 'index.html'),
                inject: 'body',
                filename: path.join('..', 'index.html')
            }),
            new ExtractTextPlugin({
                filename: isProd ? '[name].[chunkhash].css' : '[name].css',
                disable: isServer
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: isProd,
                    discardDuplicates: isProd,
                    minifyFontValues: {
                        removeQuotes: false
                    },
                    discardUnused: false,
                    mergeIdents: false,
                    core: isProd
                },
            })
        ],
        devtool: isProd ? 'source-map' : 'eval',
        devServer: {
            hot: true,
            contentBase: isProd ? paths.build : paths.dev,
            compress: true,
            port: 3000
        },
    });
};
