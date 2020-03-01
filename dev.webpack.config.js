const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const entryPoints = require("./app");

module.exports = {
    mode: "development",
    entry: entryPoints,
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.m?js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    cache: true,
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            plugins: ["@babel/plugin-transform-runtime"],
                            cacheDirectory: true,
                        }
                    },
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ]
            },
            {
                test: /\.html$/,
                loader: "html-loader",
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css",
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html",
            chunks: [ "vendor", "index"],
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
    ],
    devServer: {
        open: true,
        contentBase: "src",
        compress: true,
        stats: "minimal",
    }
};