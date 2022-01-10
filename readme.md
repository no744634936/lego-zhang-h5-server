链接数据库的步骤跟 lego-zhang-backend一摸一样
lego-zhang-backend 跟 lego-zhang-h5-server 使用相同的数据库


-------------------------------------------------------
使用mysql2来连接mysql数据库
    npm install mysql2 --save
    
    1，首先mysql数据库里面建立数据库imooc_lego_course

    2，写连接mysql数据库的配置文件
     (账号，密码等,根据运行环境不同，账号密码也会不同)， 
     (src/config/index.js)

    3，根据数据库配置文件，连接mysql数据库        ('src/db/mysql2.js)
    
    mysql2是用来测试链接数据库的，在这个项目里没什么用，
    连接跟操作mysql数据库用sequelise就可以了



    使用sequelize可以非常简单地连接数据库，并对数据表进行操作
    npm install sequelize --save

    4，让sequelize连接mysql数据库                  (src/db/seq.js)
    5，建立数据表模型                              (src/dbTables/workModel.js )

    6，controller就可以通过使用sequelize数据表模型对数据表进行增，删，改，查

    mysql数据表的同步
    这个项目不需要同步mysql数据表，
    同步数据表由lego-zhang-backend 项目来做


----------------------------------------------------------------------------
    使用mongoose来连接mongodb数据库

    1，首先mongodb里面建立数据库 imooc_lego_course
        
    2，写连接mongodb数据库的配置文件，   (src/config/index.js)

    3，使用mongoose连接mongodb数据库 src/db/mongoose.js
       npm install mongoose --save
    
    使用mongoose可以非常简单地进行数据表操作，

    4，建立数据表模型                      (src/dbTables/workContentModel.js )
    controller就可以通过使用mongoose数据表模型对数据表进行增，删，改，查

----------------------------------------------------------------------------

    对redis缓存数据库的操作，

    1,下载 redis到电脑上，打开 redis-server.exe 文件。要一直运行redis

    2,写连接redis数据库的配置文件，      (src/config/index.js)
    3,根据配置文件，连接redis数据库    (src/db/redis.js)
      npm install redis --save

    4,写两个操作redis 数据库的set get方法 (src/cache/index.js)

      controller就可以通过使用set get方法，获取，修改redis里面的缓存

    5，做一个统一的路由来测试所有数据库是否连接成功 src/routes/inde.js
       查看localhost:3001/api/database_conn_check 
--------------------------------------------------------------------------------

值得注意的是，
mongodb跟redis都更新了版本有些地方已经不一样了

关于使用mongoose来连接mongodb的写法跟lego-zhang-backend有些不同

redis已经更新到了v4,可以直接使用async 跟await了，不需要写cache/index.js 文件了

但是为了方便，我还是用v3版本继续使用cache/index.js 文件
