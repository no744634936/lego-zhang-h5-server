配置pm2 这是对1_set_up 分枝的补充

pm2 我是全局安装在我自己的电脑上的，不是安装在项目的node_modules里面的

npm install pm2 -g


1,pm2配置文件的说明 
---------------------------------------------------------------------
{
    "apps":{

        "name":"lego-h5-server",          // 将name改从www 改为lego-h5-server
        
        "script":"bin/www",      //这个不能变，启动bin/www
        
        "watch":true,            //文件更改之后，线上系统自动重启
        
        "ignore_watch":[  

            "node_modules",      //node_modules 文件夹里的文件更改的时候，不重启
            
            "logs",              // logs  文件夹里的文件更改的时候，不重启
            
            "uploadPicture"     //报存上传的文件的uploadPicture文件夹里的文件更改时不重启
        ], 

        "instances":4,      //服务器cpu是几核，就定几个进程，我电脑是4核，所以4个进程，
                            //PM2看哪个进程闲着就将api请求给哪个进程来处理

        "error_file":"./logs/err.log"       //手动建立logs 文件夹，err.log自动建立
        
        "out_file":"./logs/out.log",           //打印正常的日志
        
        "log_date_format":"YYYY-MM-DD HH:mm:ss"   //给每个日志前面加上时间戳

    }

}
--------------------------------------------

这个项目我使用的是这个文件bin/pm2AppConf.js
--------------------------------------------
const os = require('os')

const cpuCoreLength = os.cpus().length // CPU 几核

module.exports = {

    name: 'lego_h5_server',

    script: 'bin/www',

    // watch: true,

    //ignore_watch: ['node_modules', '__test__', 'logs'],

    instances: cpuCoreLength,

    error_file: './logs/err.log',

    out_file: './logs/out.log',

    log_date_format: 'YYYY-MM-DD HH:mm:ss Z', // Z 表示使用当前时区的时间格式

    combine_logs: true,         // 多个实例，合并日志

    max_memory_restart: '300M', // 内存占用超过 300M ，则重启，使用 pm2 monite 0

                                //来查看进程初始占内存是多少，然后乘以3，4，就可以

}
-----------------------------------------------
2,写bin/pm2-prd-dev.config.js" 文件
----------------------------------------------------

3,packag.json 文件里添加命令
----------------------------------------------
"prd-dev": "cross-env NODE_ENV=prd_dev pm2 start bin/pm2-prd-dev.config.js",

为了方便测试，这里临时改 NODE_ENV=production 为 NODE_ENV=dev,为了在本地测试，

即临时改为

"prd-dev": "cross-env NODE_ENV=dev pm2 start bin/pm2-prd-dev.config.js",

记住测试之后要将NODE_ENV=dev 改为 NODE_ENV=prd_dev

然后运行 npm run prd-dev  查看


4, 重新启动新进程

 pm2 stop 0 

 pm2 delete 0 

 npm run prd-dev

 现在只能看到0号进程，因为我设置了 appConf.instances = 1

 我的电脑是四核，如果appConf.instances = 4，就会看到从0到3有四个进程。

5, 故意制作一个错误浏览器里输入

   http://localhost:3000/api/user/throwError

   就可以看到 error被打印进了错去日志

   注意错误日志跟正常的日志，也会根据进程数量分为0，1，2，3。一共加起来有8个日志

   PM2日志的拆分，正式上线的时候再学

router.get("/throwError",async(ctx,next)=>{

    throw Error();

    ctx.body={

        test:"hahaha"

    }

})

6, 
操作系统会限制一个进程的最大可用内存

一个进程的最大内存数量，32位操作系统一个进程的最大可用内存为0.7G 

64位操作系统一个进程的最大可用内存为1.4G 如果一个服务器有8G内存，

你只开一个进程就是对服务器内存的浪费

7，
因为进程与进程之间无法通信，所以如果将session保存在内存里， 而又用了多个进程，

那么session就可能存在一个不同的进程里面。

我的操作是靠一个进程，可是session存放在另一个进程里面。 

那么session就找不到。 所以要将session等信息放入第三方redis里面。

上传的文件也要做单独的文件处理

8，
pm2 reroad 他是一个进程一个进程地重启，

重启期间总是保证有进程是可以被访问的