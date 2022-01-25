/**
 * @description 检查publish的作品页面的url是否带有channel 参数
 * @author zhang
 */

import { isPrd, getChannel } from '../utils'

const channel = getChannel()

// PAGE_TYPE 这个变量 src/views/layout.pug 文档里被挂在了window上
// eslint-disable-next-line no-undef
const { PAGE_TYPE, alert } = window

function checkChannel() {
    if (channel) return

    if (PAGE_TYPE !== 'publish') return // 非发布页面，则不检查

    const info = '页面 url 没有 channel ，会影响分渠道统计的数据'

    if (isPrd) {
        // prd，线上环境仅在通知台打印一个注意，不影响页面正常浏览
        console.warn(info)
        return
    }

    // 其他情况属于开发状态，dev，prd-dev，
    // 直接 alert，说 publish的作品页面的url需要channel 参数
    alert(info)
}
checkChannel()
