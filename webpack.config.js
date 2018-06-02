const devMode = ((process.env.NODE_ENV).trim() === "development");

const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const entryPoints = require("./app");

module.exports = {
    entry: entryPoints,
    output: {
        path: path.resolve(__dirname + "/dist"),
        filename: devMode ? "js/[name].js" : "js/[name]-[chunkhash].min.js",
        chunkFilename: devMode ? "js/[id].js" : "js/[id]-[chunkhash].min.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["es2015"]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            minimize: !devMode
                        }
                    },
                    "postcss-loader"
                ]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: !devMode
                    }
                }]
            },
            {
                test: /\.(svg|gif|jpe?g|png)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "assets/images/",
                            publicPath: "/assets/images/"
                        }
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            disable: devMode,
                            mozjpeg: {
                                progressive: true,
                                quality: 60
                            },
                            pngquant: {
                                quality: "60-85",
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: true,
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
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
            filename: devMode ? "css/[name].css" : "css/[name]-[contenthash].min.css",
            chunkFilename: devMode ? "css/[id].css" : "css/[id]-[contenthash].min.css"
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html",
            chunks: ["index"]
        }),
        new CleanWebpackPlugin(["dist"])
    ],
    devServer: {
        open: true,
        overlay: true,
        contentBase: "src"
    }
};