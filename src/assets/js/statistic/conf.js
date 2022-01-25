/**
 * @description 配置
 * @author zhang
 */

import { isPrd } from '../utils'

// 自定义事件统计 server
// eslint-disable-next-line import/no-mutable-exports
let eventStatServer = 'http://xxxxxxx:8083/event.png' // 测试环境的服务器地址，

if (isPrd) {
    eventStatServer = 'https://xxxxx.com/event.png' // 线上环境的服务器地址
}

export default eventStatServer
