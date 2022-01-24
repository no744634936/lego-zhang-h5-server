/**
 * @description 常量，webpack打包时的入口，出口路径
 * @author zhang
 */

const path = require('path')

const srcPath = path.join(__dirname, '..', 'src', 'assets')
const distPath = path.join(__dirname, '..', 'src', 'public')

module.exports = { srcPath, distPath }
