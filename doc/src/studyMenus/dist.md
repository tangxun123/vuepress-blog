# dist包无法在浏览器中直接打开

## index.html为什么打不开？
Vue打包后生成的dist文件中的index.html，双击在浏览器中打开后发现一片空白，打开控制台有很多报错：“Failed to load resource: net::ERR_FILE_NOT_FOUND”。
这是因为dist文件是需要放在服务器上运行的，资源默认放在根目录下。打开index.html可以发现，css和js文件的引用使用的是绝对路径，例如：
`<link href=/css/chunk-00d5eabc.f78fa75d.css rel=prefetch>`，对本地磁盘来说，/指向磁盘根目录，所以找不到引用的文件。

------

有以下解决方案；
1. 使用 http-server 创建一个服务器来访问资源
2. 手写一个简单的node服务器

### 1. 使用 http-server
```js
安装：npm install http-server -g
进入dist文件夹：cd dist
执行命令：http-server
```
如此，进入`localhost:8080`就可以查看了

### 2. 使用 express模块 搭建服务
在dist文件夹**同级目录**创建一个`server.js`文件，`npm init` 初始化项目
```js
// server.js
var express = require('express');
var app = express();
app.use(express.static("dist")).listen(8080);
```
> 安装express的包，`npm i express --save`控制台输入 `node server.js`，如此，进入`localhost:8080`就可以查看了