const CleanWebpackPlugin = require('clean-webpack-plugin')
const GoogleFontsWebpackPlugin = require('google-fonts-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { DefinePlugin } = require('webpack')

const outputDir = 'dist'

module.exports = {
    context: __dirname,
    devServer: { contentBase: outputDir },
    devtool: 'inline-source-map',
    entry: './entry.js',
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
    output: {
        filename: 'app-[hash].js',
        path: resolve(__dirname, outputDir),
    },
    plugins: [
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        // new UglifyJsPlugin(),
        new CleanWebpackPlugin([outputDir]),
        new HtmlWebpackPlugin({
            title: 'react-tree-list',
        }),
        new GoogleFontsWebpackPlugin({
            fonts: [
                {
                    family: 'Roboto Mono',
                    variants: ['500'],
                },
                {
                    family: 'Source Sans Pro',
                    variants: ['600'],
                },
            ],
            formats: ['woff'],
        }),
    ],
}
