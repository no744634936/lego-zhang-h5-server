/**
 * @description 渲染网页时带着统一的 js 和 css
 * @author zhang
 */

const path = require('path')
const fse = require('fs-extra')
const { isDev } = require('../utils/env')
const { CDNHost } = require('../config/index')

const uploadPath = 'h5-assets' // oss 中 h5 静态资源的文件夹

// 所以获取 public 下的静态文件
const files = fse.readdirSync(path.resolve(__dirname, '..', 'public'))
const cssFiles = files.filter(f => f.lastIndexOf('.css') > 0)
const jsFiles = files.filter(f => f.lastIndexOf('.js') > 0)
let cssLinks = []
let jsLinks = []

// dev 环境，直接用本地public里的文件,并将之储存到变量里面
cssLinks = cssFiles.map(f => `/${f}`)
jsLinks = jsFiles.map(f => `/${f}`)

// 非 dev 环境，获取 CDN (aws的s3)上的静态文件的路径，prd_dev跟prd两个环境使用的是同一个s3
if (!isDev) {
    cssLinks = cssFiles.map(f => `//${CDNHost}/${uploadPath}/${f}`)
    jsLinks = jsFiles.map(f => `//${CDNHost}/${uploadPath}/${f}`)
}

/**
 * renderWithAssets
 * @param {object} ctx ctx
 * @param {Function} next next
 */
//  public ，cdn下的静态文件的获取属于硬盘io，很慢
//  所以获取 public 下或CDN下的静态文件时，
//  重写ctx.render 为 renderWithAssets
//  然后再app.js 文件中注册该中间件
//  app.js初始化时就执行，
//  ASSETS_CSS_FILES 跟 ASSETS_JS_FILES被放入服务器内存之中
//  可以从内存中取出来ASSETS_CSS_FILES 跟 ASSETS_JS_FILES
//  在模板引擎里直接使用
//  而不是输入一次王子，求一次就去cdn里拿一次css，js文件的路径
//  在给模板引擎渲染
//  这样可以可以提高服务器速度

async function renderWithAssets(ctx, next) {
    // 重写了ctx.render
    ctx.renderWithAssets = async (...args) => {
        // args 是数组，第一个参数是 path ，第二个参数是渲染数据
        if (!Array.isArray(args)) throw new Error('ctx.renderWithAssets 参数格式错误，不是数组')
        if (!args[0]) throw new Error('ctx.renderWithAssets 参数格式错误，args[0] 为空')
        if (typeof args[1] !== 'object') args[1] = {} // eslint-disable-line

        // 添加 js css 文件，变量对应到 views/layout.pug
        Object.assign(args[1], {
            ASSETS_CSS_FILES: cssLinks,
            ASSETS_JS_FILES: jsLinks,
        })

        // 借用自带的 ctx.render 来完成渲染
        await ctx.render.apply(null, args)
    }

    await next()
}

module.exports = renderWithAssets
