const path = require('path');

module.exports = {
    chainWebpack: config => {
        const svgRule = config.module.rule('svg');

        svgRule.uses.clear();

        svgRule
        .use('babel-loader')
        .loader('babel-loader')
        .end()
        .use('vue-svg-loader')
        .loader('vue-svg-loader');
    },
    configureWebpack: config => {
        config.module.rules = config.module.rules.filter(item => String(item.test) !== String(/\.sass$/) &&
            String(item.test) !== String(/\.scss$/));
        config.module.rules.push({
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: require('fibers'),
                            },
                            additionalData: '@import \'@/style/index.scss\';'
                        },
                    },
                ],
            }
        );
        // console.log(config.module.rules)

        return {
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, 'src/'),
                },
            },
        }
    }
}