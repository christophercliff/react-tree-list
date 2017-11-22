const entry = 'test.js'
const snapshots = '**/__snapshots__/**/*.md'

module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        client: {
            mocha: { reporter: 'html' },
        },
        colors: true,
        files: [entry, snapshots],
        frameworks: ['mocha', 'snapshot', 'mocha-snapshot'],
        logLevel: config.LOG_INFO,
        port: 9876,
        preprocessors: {
            [snapshots]: ['snapshot'],
            [entry]: ['webpack', 'sourcemap'],
        },
        reporters: ['progress'],
        singleRun: false,
        snapshot: { update: false },
        webpack: {
            devtool: 'inline-source-map',
            module: {
                rules: [
                    {
                        exclude: /node_modules/,
                        test: /\.js$/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['es2015'],
                                plugins: [
                                    'transform-class-properties',
                                    'transform-object-rest-spread',
                                    'transform-react-jsx',
                                ],
                            },
                        },
                    },
                ],
            },
        },
    })
}
