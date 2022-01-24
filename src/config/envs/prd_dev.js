// 远程测试机的配置
module.exports = {
    // mysql 连接配置
    mysqlConf: {
        host: 'docker-host', // docker-compose.yml文件里的service name
        user: 'root',
        password: 'no744634', // docker-compose.yml文件里设置的密码
        port: '3305', // 3306是容器的port
        database: 'imooc_lego_course', // docker-compose.yml文件里设置的数据库
    },
    // mongodb 连接配置
    mongodbConf: {
        host: 'docker-host',
        port: '27016',
        dbName: 'imooc_lego_course',
    },
    // redis 连接配置
    // host和docker-compose中配置的server名一样,为什么要改，看explaination/docker-compose-port2.png
    redisConf: {
        port: '6378',
        host: 'docker-host',
    },
    awsS3Conf: {
        accessKeyId: 'AKIAVIMFHGZEY6VVYMBY',
        secretAccessKey: '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',
        region: 'ap-northeast-1',
    },
}
