/**
 * @description works router
 * @author zhang
 */

// 示例用 url: http://localhost:3001/p/137-acb3
// 通过id和uuid获取已发布的作品,先从缓存中获取，缓存中没有就从数据库中获取
const router = require('koa-router')()
const { splitIdAndUuid } = require('../utils/util')
const { findPublishWork, findPreviewWork } = require('../controller/works')

// 路由前缀
router.prefix('/p')

router.get('/:idAndUuid', async ctx => {
    const { idAndUuid } = ctx.params // 链接localhost:3001/p/137-acb3 其中137-acb3就是idAndUuid'
    const { id, uuid } = splitIdAndUuid(idAndUuid) // { id: '10', uuid: 'abc' }

    const work = await findPublishWork(id, uuid)
    if (work == null) {
        // 返回 404
        await ctx.render('404', { pageType: '404' })
        return
    }

    // 渲染页面内容
    await ctx.render('work', {
        // 后面要承载 Vue3 SSR 的结果 - html 标签
        content: `<div style="color: blue;">${JSON.stringify(work)}</div>`,
    })
})

// 任何作品都可以预览，不限于已发布作品
// 测试url: http://localhost:3001/p/preview/137-acb3
router.get('/preview/:idAndUuid', async ctx => {
    const { idAndUuid } = ctx.params
    const { id, uuid } = splitIdAndUuid(idAndUuid)

    const work = await findPreviewWork(id, uuid)
    if (work == null) {
        // 返回 404
        await ctx.render('404', { pageType: '404' })
        return
    }

    // 渲染页面内容
    await ctx.render('work', {
        content: `<div style="color: blue;">${JSON.stringify(work)}</div>`,
        pageType: 'preview',
    })
})

module.exports = router
