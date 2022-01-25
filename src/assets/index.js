/**
 * @description 静态资源，入口文件。将会被 webpack 打包到public文件夹，配置在 build-assets 目录
 * @author zhang
 */

// 业务组件库样式
import 'lego-components/dist/lego-components.css'

// // 检查 channel 参数
import './js/checkChannel/checkChannel'

// 数据统计
import './js/statistic/statPV'

// 绑定事件
import './js/bindEvent/index'
