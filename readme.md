H5前端功能
H5除了 html代码之外，还有很多功能需要js css等来实现。
而且还要引入lego-components的css 

默认情况下，所有的js css等都可以写在src/public文件夹里，

但这是一个非常原始的方式——没有打包，直接输出。

所以，我们需要借助webpack打包jscss等，还要发布到CDN上 —— 跟前端editor项目一样。

要开发H5前端功能，我们需要分两步

• webpack打包静态文件，并发布到CDN 
(本地，测试环境不需要，线上环境才需要CDN上的静态文件)

• 开发各个前端功能  (渠道号检查、事件、统计)


----------------------------------------------
webpack打包静态文件设计思路

js，css的源代码，包括lego-components样式的引入，写在src/assets。

经过webpack打包，输出到src/public。 T

webpack 打包配置在 build-assets。

src/public是koa2默认的静态文件服务，所以输出到这里，就可以有静态服务。

src/public需要加入到.gitignore ,它就像dist ,无需存储到git。

流程:
• 安装webpack相关插件

• build-assets/下的webpack配置文件

• src/assets/下的静态文件

• package.json 中增加 build-assets- 相关的scripts

• .gitignore 屏蔽掉 src/public

-------------------------------------------------------------
webpack的具体用法可以看github上的webpack_tutorial项目

-----------------------------------------------------------
打包静态文件，开发流程:

1, 建立 src/assets 文件夹里的两个文件

2, 建立 build-assets 文件夹里的文件，下面为查看顺序

    constants.js

    webpack.common.js

    webpack.dev.js

    webpack.prd.js


3, package.json文件里写上三个命令

"build-assets-dev": "cross-env NODE_ENV=dev webpack --config build-assets/webpack.dev.js",

"build-assets-prd-dev": "cross-env NODE_ENV=prd_dev webpack --config build-assets/webpack.prd.js",

"build-assets-prd": "cross-env NODE_ENV=production webpack --config build-assets/webpack.prd.js",

4,测试
npm run build-assets-dev

npm run build-assets-prd

查看src/public文件夹里文件的变化


------------------------------------
静态文件上传AWS 的s3的流程

1，在lego-zhang-backend项目的时候已经在s3控制台里建立了lego-test-bucket

2，建立 build-assets/assets-upload-s3.js  文件

3，建立 awsS3.js 文件 (这个文件里的上传文件的方法需要用stream重写一遍才行，现在先这样)

4,package.json里添加两条命令

    dev环境下，图片，css，js 等静态资源都是存放在本地的public上的

    只有prd_dev跟prd 环境下才会将静态资源上传到s3上面去


    "upload-assets-prd-dev": "cross-env NODE_ENV=prd_dev node build-assets/assets-upload-s3.js",

    "upload-assets-prd": "cross-env NODE_ENV=production node build-assets/assets-upload-s3.js",

5, 测试 npm run upload-assets-prd-dev