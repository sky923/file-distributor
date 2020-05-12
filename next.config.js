module.exports = {
    webpack: config => {
        config.node = {
            fs: 'empty'
        };
        config.module.rules.push({
            test: /.(png|jpg)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]?[hash]',
                        emitFile: false,
                        publicPath: '/'
                    }
                }
            ]
        });
        return config;
    }
};