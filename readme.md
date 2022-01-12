
总结docker docker-compose 使用流程

lego_h5_server 跟 lego_backend 共享 mysql，mongo，redis 数据库

lego_backend项目的时候已经在docker里把 mysql，mongo，redis，editor-server

这四个image建好了

cd到lego_backend项目根目录下，启动容器
docker-compose up -d
-----------------------------------


1，建立Dockerfile 

   注意有一句命令跟lego_backend 项目里的Dockerfile不一样

   /sbin/ip route|awk '/default/ { print $3,"\tdocker-host" }' >> /etc/hosts


1.5，建立.dockerignore


2，建立docker-compose.yml


3，建立src/config/envs/prd-dev.js 文件

    host 全部改为 docker-host

4, 建立 bin/pm2-prd-dev.config.js 文件

5，建立mysql/init里的init.sql文件


6, 根据Dockerfile建立自己的images
   cd到当前lego_h5_server项目的根目录下去构建服务
    docker-compose build h5-server<跟第一个service name一样>

7，cd 到 lego_h5_server项目下，启动容器
   根据docker-compose.yml文件，启动服务，
   也可以叫启动container，后台启动，
   并将宿主机的port与容器的port对应，
   这样宿主机就跟容器建立了联系

    docker-compose up -d 


8,  http://localhost:8082
    http://localhost:8082/api/database_conn_check

9,cd到 lego_h5_server项目下 执行 docker-compose down 
  只会停止 h5-server 这个container
  cd到 lego_backend项目下 执行 docker-compose down
  会停止 editor-server ，redis，mysql，mongo这些container

-------------------------------------------
查看容器日志 docker logs <container-id>
进入容器的cmd控制台 docker exec -it <container-id> /bin/sh
ctrl+d 可以退出docker的容器container
