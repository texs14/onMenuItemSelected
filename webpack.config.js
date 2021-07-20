const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/js/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },

    mode: 'development',
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.relative(__dirname, './src/index.pug'),
        }),
        new HtmlWebpackPlugin({
            filename: "pages/ui-kit/colors-and-type.html",
            template: path.relative(__dirname, './src/pages/ui-kit/colors-and-type/colors-and-type.pug'),
        }),
        new HtmlWebpackPlugin({
            filename: "pages/ui-kit/header-and-footer.html",
            template: path.relative(__dirname, './src/pages/ui-kit/header-and-footer/header-and-footer.pug'),
        }),
        new HtmlWebpackPlugin({
            filename: "pages/ui-kit/form-elements.html",
            template: path.relative(__dirname, './src/pages/ui-kit/form-elements/form-elements.pug'),
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),

    ],

    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.s?css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },
            // шрифты
            {
                test: /\.(woff(2)?|eot|ttf|otf|)$/,
                type: 'asset/inline',
            },
            // Images
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    `file-loader?name=images/[name].[ext]`,
                    {
                        loader: 'image-webpack-loader',
                    },
                ]
            },
        ],
    }
}