const path = require('path');
const resolve = require('resolve');

module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [resolve(__dirname, 'src/path/to/css/*.scss')],
        },
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            console.log(`prod env: ${config}`);
        } else {
            console.log(`dev env: ${config}`);
        }

        return {
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, 'src/'),
                },
            },
        }
    },
}