/**
 * @description 作品内容 Model ，存储到 Mongodb
 * @author zhang
 */

const mongoose = require('../db/mongoose')

// 为什么要加这两句话？
// 我在src/routes/index,js 里面有加载当前这个文件require('../db_tables/workContentModel')
//

const contentSchema = mongoose.Schema(
    {
        // mongodb 会自动生成_id不用自己专门设定
        // 页面的组件列表
        components: [Object],
        // 页面的属性，如页面背景图片
        props: Object,
        // 配置信息，如微信分享配置
        setting: Object,
    },
    { timestamps: true }
)

// 未发部内容的数据表
const WorkContentModel = mongoose.model('workContent', contentSchema)

// 已发布内容的数据表
const WorkPublishContentModel = mongoose.model('workPublishContent', contentSchema)

module.exports = {
    WorkContentModel,
    WorkPublishContentModel,
}

// node src/db_tables/workContentModel.js 不报错就应该没问题
