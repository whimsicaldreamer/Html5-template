const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common.config");
const proxies = require("./proxy-config");

module.exports = merge.smart(common, {
    mode: "development",
    output: {
        filename: "js/[name].js",
        chunkFilename: "js/[name].js",
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                ]
            },
            {
                test: /\.(gif|jpe?g|png|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                        }
                    },
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css",
        }),
    ],
    devServer: {
        contentBase: "src",
        compress: true,
        stats: "minimal",
        port: 8080,
        proxy: proxies,
    },
    devtool: "eval-source-map",
});