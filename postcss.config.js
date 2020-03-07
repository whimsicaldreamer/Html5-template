module.exports = {
    plugins: {
        "postcss-preset-env": {},
        "cssnano": {
            preset: ["default", {
                discardComments: { removeAll: true }
            }]
        },
    }
};