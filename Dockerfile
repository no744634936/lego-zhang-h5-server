FROM node:16
WORKDIR /app
COPY . /app

# 构建镜像时，一般用于做一些系统配置，安装必备的软件。可有多个 RUN 命令
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
RUN npm set registry https://registry.npm.taobao.org
RUN npm install
# 全局安装PM2
RUN npm install -g pm2 



# /sbin/ip route|awk '/default/ { print $3,"\tdocker-host" }' >> /etc/hosts 
# 这句话的意思是将  "197.3.4.1    docker-host" 这样的一句话写入 /etc/hosts 文件中
# 宿主机的ip 197.3.4.1 对应 docker-host
# 这样的写是为了让 以让 h5-server 可以访问宿主机的数据库，
# 网页输入 http://localhost:8082，就连接到了 h5-server
# h5-server又通过 src/config/envs/prd_dev.js 里的配置，

# docker-host:27016 连接到mongodb
# docker-host:3305 连接到mysql
# docker-host:6378 连接到redis

# 具体示意图看 explaination/picture_2.png

CMD /sbin/ip route|awk '/default/ { print $3,"\tdocker-host" }' >> /etc/hosts && npm run prd-dev && npx pm2 log
