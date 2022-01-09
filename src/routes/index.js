const router = require('koa-router')()
const packageInfo = require('../../package.json')
const testMysqlConn = require('../db/mysql2')
const { ENV } = require('../utils/env')
const { WorkContentModel } = require('../dbTables/workContentModel')
const { cacheGet, cacheSet } = require('../cache/index')

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!',
    })
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json',
    }
})

// 测试数据库的连接
router.get('/api/database_conn_check', async (ctx, next) => {
    // 测试mysql连接
    const mysqlResponse = await testMysqlConn()

    // 测试 mongodb 连接
    let mongodbConn
    try {
        mongodbConn = true
        await WorkContentModel.findOne() // 不报错就算连接成功
    } catch (ex) {
        mongodbConn = false
    }

    // 测试 redis 连接
    cacheSet('name', 'biz h5 sever OK - by redis')
    const redisTestVal = await cacheGet('name')

    ctx.body = {
        errno: 0,
        data: {
            name: 'zhang h5 server',
            // 打印版本信息有助于出现问题时，发现是哪一个版本出了问题
            version: packageInfo.version,
            ENV,
            mysqlConn: mysqlResponse.length > 0,
            mongodbConn,
            redisConn: redisTestVal != null,
        },
    }
})

module.exports = router
