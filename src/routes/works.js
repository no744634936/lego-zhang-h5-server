/**
 * @description works router
 * @author zhang
 */

// 示例用 url: http://localhost:3001/p/143-9b48
// 通过id和uuid获取已发布的作品,先从缓存中获取，缓存中没有就从数据库中获取
const router = require('koa-router')()
const { splitIdAndUuid } = require('../utils/util')
const { findPublishWork, findPreviewWork } = require('../controller/works')
const { propsToStyle, getLegoComponentsHtml } = require('../utils/render')
// 路由前缀
router.prefix('/p')

/**
 * 渲染页面
 * @param {object} ctx ctx
 * @param {object} work work 已发布的作品信息
 * @param {string} pageType 'publish' / 'template'
 */
async function renderPage(ctx, work, pageType) {
    const { title, desc = '', content = {} } = work
    const { props = {}, components = [], setting = {} } = content

    const bodyStyle = propsToStyle(props)
    const componentsHtml = await getLegoComponentsHtml(components)

    // 渲染页面
    await ctx.renderWithAssets('work', {
        title,
        desc,
        bodyStyle,
        content: componentsHtml,
        pageType,
    })
}

// 从数据库中找到已发布作品的json，然后将之做成一个html字符串，
// 然后将这个html字符串交给 views/works.js 文件，
// 渲染成完整的网页
router.get('/:idAndUuid', async ctx => {
    const { idAndUuid } = ctx.params // 链接http://localhost:3001/p/143-9b48 其中143-9b48就是idAndUuid'
    const { id, uuid } = splitIdAndUuid(idAndUuid) // { id: '10', uuid: 'abc' }

    const work = await findPublishWork(id, uuid)
    if (work == null) {
        // 返回 404
        await ctx.renderWithAssets('404', { pageType: '404' })
        return
    }

    if (work.isTemplate) {
        // 模板
        await renderPage(ctx, work, 'template')
    } else {
        // 正常页面
        await renderPage(ctx, work, 'publish')
    }
})

// 任何作品都可以预览，不限于已发布作品
// 测试url: http://localhost:3001/p/preview/143-9b48
router.get('/preview/:idAndUuid', async ctx => {
    const { idAndUuid } = ctx.params
    const { id, uuid } = splitIdAndUuid(idAndUuid)

    const work = await findPreviewWork(id, uuid)
    if (work == null) {
        // 返回 404
        await ctx.renderWithAssets('404', { pageType: '404' })
        return
    }

    await renderPage(ctx, work, 'preview')
})

module.exports = router
