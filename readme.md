1，npm install vue@next

2，npm i @vue/server-renderer

3，使用vue3的服务器端渲染（SSR）

作为练习，查看explaination/vue3_SSR_practice文件夹里的文件

4，npm i lego-components


5，查看routes/woks.js 文件中的两个路由

这节的主要内容是将已发布的作品取出来，

做成一个html字符串

然后将这个html字符串交给 views/works.js 文件，

渲染成完整的网页


----------------------------------------------------
测试流程

首先使用editor_backend_server里的 api

localhost:3000/api/works/create

然后使用

explaination/published_work_example.json

文件里的数据创建一个作品

然后使用api

localhost:3000/api/works/publish/:id

发布该作品得到一个链接:

http://localhost:3001/p/143-9b48

浏览器输入该链接就可以查看结果了



