module.exports = {
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