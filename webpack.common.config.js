const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const entryPoints = require("./app");

const getAllPages = () => {
    return Object.entries(entryPoints).map(([page]) => {
        return new HtmlWebpackPlugin({
            filename: `${page}.html`,
            template: `src/${page}.html`,
            chunks: ["vendor", page],
        });
    });
};

module.exports = {
    entry: entryPoints,
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.m?js$/i,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    cache: true,
                }
            },
            {
                test: /\.m?js$/i,
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
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader",
                    },
                ]
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(gif|jpe?g|png|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "assets/images/",
                            publicPath: "/assets/images/",
                            esModule: false,
                        }
                    },
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "assets/fonts/",
                            publicPath: "/assets/fonts/",
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        ...getAllPages(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
    ],
};