/**
 * @description 404 error router
 * @author zhang
 */

const router = require('koa-router')()

// 错误页
router.get('/error', async ctx => {
    await ctx.render('error', {
        title: '网站错误',
        pageType: 'error',
    })
})

// 404 路由，一定要注意放在最后！！！
// * 代表所有路由，上面的所有路由都没有命中的话就触发404页面
router.get('*', async ctx => {
    await ctx.render('404', {
        title: '404',
        desc: '页面不存在',
        pageType: '404',
    })
})

module.exports = router
