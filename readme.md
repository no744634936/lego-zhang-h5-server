项目建立

1, koa2 lego_h5_server

2, 建立src文件夹，将public，routes，views,app.js文件放入

3，bin/www 里将端口3000改为3001，

   var app = require('../app');改为

   var app = require('../src/app');

4, git init

开发前的准备工作
1，npm install jest --save-dev

2，安装supertest npm install supertest --save-dev

3，创建_test_/apis 文件夹里的所有文件

4, npm install cross-env --save

5,package.json 里面写上这下面这两句

"test:local": "cross-env NODE_ENV=test_local jest --runInBand --passWithNoTests --forceExit --colors",

"prd": "cross-env NODE_ENV=production pm2 start bin/www",

6, cmd控制台输入命令，npm run test:local

--------------------------------------------------------------------------

写代码的规范
1，
npm install eslint --save-dev 

npm install prettier --save-dev

2，
npm install eslint-plugin-import --save-dev 

npm install eslint-plugin-prettier --save-dev

3，
npm install eslint-config-airbnb-base --save-dev 

npm install eslint-config-prettier --save-dev

4, 三个文件

.eslintrc.js
.eslintignore

5,
package.json里写上 

"lint": "eslint \"src/**/*.{js,ts}\"",         //检查src文件夹里的代码布局，语法。 

"lint-fix": "eslint --fix \"src/**/*.{js,ts}\""  //修改src文件夹里的代码布局。

npm run lint //检查代码布局，语法。 

npm run lint-fix //修改代码布局。

---------------------------------------------------------------------
git commit 之前自动做格式检查

1，
npm install husky --save-dev 

npx husky install //生成一个.husky文件

npx husky add .husky/pre-commit    //生成pre-commit文件 commit之前做修改格式

pre-commit文件里写上 npm run lint-fix

npx husky add .husky/pre-push     //生成pre-push 文件 push之前做test

pre-push文件里写上 npm run test:local