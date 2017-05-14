const webpack = require('webpack');

module.exports = {
    plugins: [
        require('postcss-import')({
            addDependencyTo: webpack
        }),
        require('postcss-nesting')(),
        require('postcss-cssnext')(),
    ]
};
