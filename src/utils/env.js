// 程序运行环境变量
// process.env.NODE_ENV 是什么在package.json 文件里的"scripts" 里面查看
const ENV = process.env.NODE_ENV || ''

module.exports = {
    ENV,
    isPrd: ENV === 'production',
    isPrdDev: ENV === 'prd_dev',
    isDev: ENV === 'dev',
    isTest: ENV.indexOf('test') === 0,
    isTestLocal: ENV === 'test_local',
    isTestRemote: ENV === 'test_remote',
}
