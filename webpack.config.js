const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: ["@babel/polyfill", "./src/main.js"],
    output: {
        path: path.resolve(__dirname ,'dist'),
        filename: 'assets/js/[name].bundle.js',
    },
    devServer: {
        contentBase: __dirname + '/dist'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg|mp3)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: {
                    loader: 'babel-loader'
                }
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'assets/css/[name].css',
        //   chunkFilename: '[id].css',
          ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
      ]
};