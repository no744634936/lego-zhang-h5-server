// 远程测试机的配置
module.exports = {
    // mysql 连接配置
    mysqlConf: {
        host: 'editor-mysql', // docker-compose.yml文件里的service name
        user: 'root',
        password: 'no744634', // docker-compose.yml文件里设置的密码
        port: '3306', // 3306是容器的port
        database: 'imooc_lego_course', // docker-compose.yml文件里设置的数据库
    },
    // mongodb 连接配置
    mongodbConf: {
        host: 'editor-mongo',
        port: '27017',
        dbName: 'imooc_lego_course',
    },
    // redis 连接配置
    // host和docker-compose中配置的server名一样,为什么要改，看explaination/docker-compose-port2.png
    redisConf: {
        port: '6379',
        host: 'editor-redis',
    },
}
