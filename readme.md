---------------------------------------
渠道检查

0 layout.pug 设置一下pageType变量

1 assets/js/checkChanel/checkChannel.js 文件

2 assets/js/utils.js 文件

3 assets/index.js 文件引入checkChannel.js

4，npm run dev

5,浏览器输入
http://localhost:3001/p/143-9b48

http://localhost:3001/p/143-9b48?channel=facebook

对比效果


--------------------------------------------------
统计服务相关功能

1 assets/js/statistic/statPV.js 文件

2 assets/js/statistic/sendEvent.js 文件

3 assets/js/statistic/conf.js 文件

4 assets/index.js 文件引入statPV.js

5，由于还没有做，统计服务器的相关功能，先把代码写在这里


-----------------------------------------------
事件的绑定(点击跳转事件)

1 routes/work.js 里获取事件的数据

2,layout.pug 设置一下eventInfoList变量,挂到window上去

3,建立 assets/js/bindEvent/index.js 文件

4,建立 assets/js/bindEvent/jumpTo.js 文件

5,assets/index.js 文件引入 bindEvent/index.js 文件

6, 使用 zhang_lego_backend  的api

localhost:3000/api/works/create

然后使用

explaination/published_work_example.json

文件里的数据创建一个作品

然后使用api

localhost:3000/api/works/publish/:id

发布该作品得到一个链接:http://localhost:3001/p/150-bb46

浏览器输入
http://localhost:3001/p/150-bb46?channel=facebook

点击书本图片即可看到跳转
跳转的url上还带有channel=facebook 参数

