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
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        }
                    },
                    "sass-loader",
                ]
            },
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            {
                test: /\.(gif|jpe?g|png)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "assets/images/",
                            publicPath: "/assets/images/"
                        }
                    },
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "assets/fonts/",
                            publicPath: "/assets/fonts/"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css",
        }),
        ...getAllPages(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
    ],
    devServer: {
        contentBase: "src",
        compress: true,
        stats: "minimal",
        port: 8080,
    },
    devtool: "eval-source-map",
};