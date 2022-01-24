/* eslint-disable import/no-extraneous-dependencies */
/**
 * @description webpack common config
 * @author zhang
 * ---------
 * npm install webpack --save-dev           //使用webpack必须要的包
 * npm install webpack-cli --save-dev       //使用webpack必须要的包
 * npm install webpack-merge --save-dev     //将两个webpack的config文件合并到一起
 * ---------
 * npm install clean-webpack-plugin --save-dev          // 只保留新编译的css，js文件，删除旧的
 * npm install css-loader   --save-dev                  // 将css的内容解析出来
 * npm install mini-css-extract-plugin --save-dev       // 将css抽取来放入一个独立问文件
 * npm install css-minimizer-webpack-plugin --save-dev  // 压缩css文件体积
 * npm install copy-webpack-plugin --save-dev           // 将文件从一个文件夹拷贝到另一个文件夹
 * ---------
 * npm install @babel/core --save-dev       //使用babel必须要的三个包
 * npm install babel-loader --save-dev      //使用babel必须要的三个包
 * npm install @babel/preset-env --save-dev //使用babel必须要的三个包
 */

const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { srcPath, distPath } = require('./constants')

module.exports = {
    entry: path.join(srcPath, 'index'),
    output: {
        path: distPath,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'], // 将js的6，7，8，9，10，等版本的语法编译成版本5的语法
                        // 如果有其他被使用到的新特性，但是没被主流浏览器，也要在网上查一下，然后添加到plugins里面来
                        plugins: [],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
                    'css-loader',
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),

        new CopyPlugin({
            patterns: [
                // 拷贝 favicon.jpg 到src/public 文件夹里去
                {
                    from: path.join(srcPath, 'favicon.jpg'),
                    to: path.join(distPath, 'favicon.jpg'),
                },
            ],
        }),
    ],
}
