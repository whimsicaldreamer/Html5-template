const path = require("path");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common.config");

module.exports = merge.smart(common, {
    mode: "production",
    output: {
        path: path.resolve(process.cwd(), "dist"),
        filename: "js/[name]-[chunkhash].min.js",
        chunkFilename: "js/[name]-[chunkhash].min.js",
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                        }
                    },
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                    },
                ]
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    minimize: true,
                }
            },
            {
                test: /\.(gif|jpe?g|png|svg)$/i,
                use: [
                    {
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 60,
                            },
                            pngquant: {
                                quality: [0.60, 0.80],
                                speed: 4,
                                strip: true,
                            },
                            gifsicle: {
                                interlaced: true,
                            },
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name]-[contenthash].min.css",
            chunkFilename: "css/[name]-[contenthash].min.css",
        }),
    ],
    devtool: "source-map",
});