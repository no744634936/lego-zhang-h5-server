public ，cdn下的静态文件的获取属于硬盘io，很慢，

所以获取 public 下或CDN下的静态文件时，

重写ctx.render 为 renderWithAssets

然后再app.js 文件中注册该中间件

app.js初始化时就执行，

ASSETS_CSS_FILES 跟 ASSETS_JS_FILES被放入服务器内存之中

可以从内存中取出来ASSETS_CSS_FILES 跟 ASSETS_JS_FILES 

在模板引擎里直接使用

而不是输入一次王子，求一次就去cdn里拿一次css，js文件的路径

在给模板引擎渲染

这样可以可以提高服务器速度


1，创建renderWithStaticAssets.js  中间件重写ctx.render

2，app.js 里注册 使用renderWithStaticAssets 中间件

3, routes/work.js 里renderPage 方法

   使用 ctx.renderWithAssets 代替 ctx.render

4，views/layout.pug 模板可以直接使用ASSETS_CSS_FILES 跟 ASSETS_JS_FILES


5，修改package.js 文件里的命令，自动打包，上传静态文件

    "dev": "npm run build-assets-dev && cross-env NODE_ENV=dev ./node_modules/.bin/nodemon bin/www",

    "prd-dev": "npm run build-assets-prd-dev && npm run upload-assets-prd-dev && cross-env NODE_ENV=prd_dev pm2 start bin/pm2-prd-dev.config.js",

    "prd": "npm run build-assets-prd && npm run upload-assets-prd &&cross-env NODE_ENV=production pm2 start bin/www",


6， npm run dev

   网页输入 http://localhost:3001/p/143-9b48

   可以看到这个网页使用的是，public 文件夹里的 main.js 跟style.css


7，远程测试机使用以下步骤测试
   本地没有办法测试

   npm run prd_dev

   网页输入 http://测试机-IP/p/143-xxx

   可以看到这个网页使用的是，cdn (aws s3)上的 main.xxxx.js 跟style.xxx.css 文件