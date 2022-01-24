/* eslint-disable import/no-extraneous-dependencies */
/**
 * @description webpack prd config
 * @author zhang
 */

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin') // webpack5 自带了这个包
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common')

module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: 'main.[contenthash:8].js', // 打包代码时，加上 hash 戳
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify(process.env.NODE_ENV),
        }),
        // css 文件加 hash
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash:8].css',
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        // 压缩js，压缩 css
        minimizer: [new TerserJSPlugin(), new CssMinimizerPlugin()],
    },
})
