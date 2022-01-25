/* eslint-disable import/no-extraneous-dependencies */
/**
 * @description webpack dev config
 * @author zhang
 */

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackCommonConf = require('./webpack.common')

module.exports = merge(webpackCommonConf, {
    mode: 'development',
    output: {
        filename: 'main.js', // 输出编译后的内容到src/public/main.js
    },
    plugins: [
        // 分离 css 文件
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        // 使用webpack 配置环境变量
        new webpack.DefinePlugin({
            ENV: JSON.stringify(process.env.NODE_ENV),
        }),
    ],
})
