const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
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