准备工作,
---------------------------------------------------------------------
1， 将自己windows 电脑上的私钥(C:\Users\zhang/.ssh/id_rsa) 
    放入 lego-zhang-h5_server 仓库的secrets里面 命名为ZHANG_ID_RSA
    流程: github上的项目仓库-->setting-->secrets-->new repository secrets

2， 如果是私有仓库的话需要获取该项目仓库的token 

    Settings => Developer Settis => Personal Access Token => 
    Generate New Token (Give your password) => Fillup the form =>
    click Generate token => Copy the generated Token

    生成了一个一年期的token (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)

3, 用 zhang 账号登录aws测试机，(ssh zhang@54.199.244.92)

4, pwd 显示当前的工作目录为/home/zhang/

5, 输入 mkdir imooc-lego-h5 命令创建 /home/zhang/imooc-lego-h5 目录

6, cd imooc-lego-h5

8, 将项目的dev分支，clone到测试机
    --私有仓库，使用 github token 来下载项目 git clone https://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@github.com/no744634936/lego-zhang-h5-server.git -b dev 
    --公有仓库就只需要 git clone https://github.com/no744634936/lego-zhang-h5-server.git -b dev 

9, ls 可以看到有个 lego-zhang-h5-server 文件夹
---------------------------------------------------------------
利用github action 将3_dev分支自动发布到测试机

3_dev 分支被push到github的之前

在 pre-push的阶段，会启动本地测试 npm run test:local

3_dev 分支被push到github之后

github action会自动识别github/workflow/test.yml 文件 

然后执行github/workflow/test.yml  里写好的命令

将这个3_dev分支部署到AWS的测试机(测试服务器)上去，

关于测试机的配置，查看3_6_AWS_explain.txt 跟 aws.txt两个文件

需要用到github action的话，以README.md里的设置方法为准

不需要用到github action的话，以aws.txt里的设置方法为准

----------------------------------------------------------------
项目里建立 .github/workflow/test.yml 文件，如下


name: deploy for 3_dev                  #action的名称
on:                                     #触发 github action
    push:                               
        branches:
            - 3_dev                     #3_dev 分支被push到github的时候触发 actions
        paths:                          #如果改动了这些文件夹里的文件，就触发action
            - '.github/workflows/*'
            - 'src/**'
            - 'Dockerfile'
            - 'docker-compose.yml'
            - 'bin/*'

jobs:
    test:
        runs-on: ubuntu-latest          #ubuntu-latest 系统上测试，默认的，不用改

        steps:
            - name: Checkout              #步骤一
              uses: actions/checkout@v2   #actions/checkout@v2第三方插件，就相当于 checkout ,将3_dev分支的最新代码拉到ubuntu-latest这个系统里时要用到
            - name: set ssh key           #给github上的ubuntu-latest系统设置我本地电脑的私钥，后面ubuntu-latest就可以拿着我的私钥，去匹配aws上的共钥，登录测试机。 
              run: |                      
                  mkdir -p ~/.ssh/
                  echo "${{secrets.ZHANG_ID_RSA}}" > ~/.ssh/id_rsa
                  chmod 600 ~/.ssh/id_rsa
                  ssh-keyscan "54.199.244.92" >> ~/.ssh/known_hosts    #54.199.244.92 是测试机ip

            - name: deploy               # 部署，将3_dev部署到测试机上
              run: |                     # 执行多行命令要要使用竖线，ubuntu-latest系统拿着我的私钥，去登录测试机，引号里面就是要执行的命令
                  ssh zhang@54.199.244.92 "   #登录测试机 注意有引号
                  
                    cd /home/zhang/imooc-lego/lego-zhang-backend;
                    docker-compose down;          #imooc-lego/lego-zhang-backend目录下只会停止删除mysql，redis，mongo，editor_server四个docker-compose.yml文件里的容器，不容影响其他容器
                    git remote add origin https://github.com/no744634936/lego-zhang-backend.git;
                    git checkout 3_dev;
                    git pull origin 3_dev;        #重新下载最新代码
                    git remote remove origin;
                    docker-compose build editor-server;
                    docker-compose up -d;
                  "
            - name: delete ssh key              # 删除上面给ubuntu-latest 设置的私钥.
              run: rm -rf ~/.ssh/id_rsa


--------------------------------------------------------------
使用github action 将3_dev分支的代码部署到 测试机


本地电脑里在3_dev 分支上
git add .
git commit -m "good"
git push

查看github 上的actions
本地电脑的浏览器打开 
http://54.199.244.92:8081/
http://54.199.244.92:8081/api/db_check


确认之后,修改_test_/apis/_server.js 文件里的
const REMOTE_HOST = 'http://54.199.244.92:8081' 

就可以在本地电脑上 远程测试了
npm run test:remote

注意: 如果AWS的服务器停止之后再启动ip会换的

-----------------------------------------------

下一次push 3_dev branch到github上时


本地直接更改3_dev分支上的文件，

然後
git add .
git commit -m "good"
git push

github action 再次 启动

docker 重新建立 editor-server镜像，

第一次建立的editor-server镜像会变成<none>

用 docker image prune 来删掉,

不知道为什么用docker image prune  之后，执行git push命令。github action 就会报错

用下面的命令来手动删除<none>吧

有时候不知道怎么了，删不掉<none>

可以使用下面这些命令手动删除

#停止container
docker stop <container-id>

# 删除container
docker rm <container-id>

#删除image
docker rmi <image-id>

# 查看所有正在使用中的容器。
docker ps
# 查看所有的容器。
docker ps -a

#查看docker logs
docker logs <container-id>  # 需等待构建完成

#查看所有images 
docker images

#进入容器控制台，进入 docker container里的cmd控制台
docker exec -it <container-id> /bin/sh


9,cd到 lego_h5_server项目下 执行 docker-compose down 
  只会停止 h5-server 这个container

  cd到 lego_backend项目下 执行 docker-compose down
  会停止 editor-server ，redis，mysql，mongo这些container





