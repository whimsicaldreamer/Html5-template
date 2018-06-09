const devMode = ((process.env.NODE_ENV).trim() === "development");

const path = require("path");
const glob = require("glob-all");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const entryPoints = require("./app");

module.exports = {
    entry: entryPoints,
    output: {
        path: path.resolve(__dirname + "/dist"),
        filename: devMode ? "js/[name].js" : "js/[name]-[chunkhash].min.js",
        chunkFilename: devMode ? "js/[id].js" : "js/[name]-[chunkhash].min.js"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
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
                    "css-loader",
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
            chunkFilename: devMode ? "css/[id].css" : "css/[name]-[contenthash].min.css"
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html",
            chunks: [ "vendor", "index"]
        }),
        new CleanWebpackPlugin(["dist"])
    ].concat(
        devMode ? [
            /**
             * Remove this plugin if you are not dealing with backend files
             * If using any backend files other than PHP, change the `match` option to match
             * the file type you want to watch for.
             */
            new BrowserSyncPlugin(
                {
                    proxy: "http://localhost:8080",
                    files: [
                        {
                            match: [
                                "**/*.php"
                            ],
                            fn: function(event, file) {
                                if (event === "change") {
                                    const bs = require("browser-sync").get("bs-webpack-plugin");
                                    bs.reload();
                                }
                            }
                        }
                    ]
                },
                {
                    reload: false
                })
        ] : [
            new PurifyCSSPlugin({
                paths: glob.sync([
                    path.join(__dirname, "src/*.html"),
                    path.join(__dirname, "src/js/*.js")
                ]),
                minimize: true
            }),
            new CopyWebpackPlugin([
                {
                    from: "src/",
                    ignore:["assets/**/*", "css/**/*", "js/**/*", "*.html", ".gitkeep"]
                }
            ])
        ]
    ),
    devServer: {
        //open: true, // Uncomment/Comment `open` if not using/using Browser-sync-plugin
        overlay: true,
        contentBase: "src",
        // OPTIONAL: Remove following if you are not using any backend
        proxy: {
            "/": {
                target: {
                    host: "project-url", // Change it to virtual host URL
                    protocol: "http",
                    port: 80 // Port No of your virtual host. Check `httpd-vhosts.conf` if you are not sure
                },
                changeOrigin: true,
                secure: false
            }
        }
    }
};