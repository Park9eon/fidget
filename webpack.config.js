'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

require('dotenv').config();

const {
    TITLE,
    DEV_URL,
    GA_ID,
    DESCRIPTION,
    KEYWORDS,
} = process.env;

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        port: 3000
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ManifestPlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'application',
            devServer: DEV_URL,
            googleAnalytics: {
                trackingId: GA_ID,
                pageViewOnLoad: true
            },
            meta: [
                {
                    name: 'description',
                    content: DESCRIPTION
                }, {
                    name: 'keywords',
                    content: KEYWORDS
                }
            ],
            mobile: true,
            lang: 'ko-KR',
            inlineManifestWebpackName: 'webpackManifest',
            title: TITLE,
        }),
    ]
};
