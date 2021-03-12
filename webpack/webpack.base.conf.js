const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')



const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../build'),
    assets: 'assets/'
}

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `bundle.js`,
        path: PATHS.dist
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: { path: `./postcss.config.js` }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '~': PATHS.src,
            '@': `${PATHS.src}/js`
        }
    },
    plugins: [

        new HtmlWebpackPlugin({
            hash: false,
            template: './src/index.html',
            filename: 'index.html',
        }),

        new MiniCssExtractPlugin({
            filename: `style.css`
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: `${PATHS.src}/${PATHS.assets}img`,
                to: `${PATHS.assets}img`
            }, ]
        }),

    ]
}