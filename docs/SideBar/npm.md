你了解npm、nvm及nrm的区别以及一些操作指令吗？下面讲讲它们～



* # npm  js的包管理工具
npm (官网：https://www.npmjs.com/) 的全称是 Node Package Manager 是 JavaScript 世界的包管理工具,并且是 Node.js 平台的默认包管理工具。通过 npm 可以安装、共享、分发代码,管理项目依赖关系。

###     常用命令
```js
npm install  // 安装模块
npm uninstall // 卸载模块
npm update // 更新模块
npm ls // 查看安装的模块
npm init // 在项目中引导创建一个package.json文件
npm config // 管理npm的配置路径
npm cache // 管理模块的缓存
npm start // 启动模块
npm version // 查看模块版本
npm adduser  // 用户登录
npm publish // 发布模块
npm access // 在发布的包上设置访问级别
```
  
* ### npm上传自己的包

```js
npm install ModuleName    //检查包是否已存在  
```
#####    如果没有，则新建一个  ModuleName 文件夹

```js
cd ModuleName
npm init -y
```
进入package.json文件

```js
"name": "ModuleName",     //必填项目名称
 "version": "0.0.1"    //必填版本信息
 "main":'./dist/index.js'   //暴露的文件地址名称
```
##### 登录npm  ,没有账号去  [https://www.npmjs.com/]()   注册账号

```js
 npm login    //输入用户名、密码和邮箱
```
更新 npm 包时，记得修改 package.json 文件夹中的 version 版本信息

#####  执行指令发布自己的包，切记更新包时修改版本号信息

```js
npm publish
```
#####  撤销已发布的包

```js
npm unpublish '包名'
```
如果已发布包，在自己的项目下执行npm install 包名 --save-dev 就可以安装你自己的包了

```js
npm install '包名' --save  //下载到自己的项目
```

* # nvm 灵活的切换node版本

###     常用命令
```js
npm  install   -g   nvm     //安装
nvm install ##    // 安装指定版本，可模糊安装，如：安装v6.2.0，既可nvm install v6.2.0，又可nvm install 6.2
nvm uninstall ##   // 删除已安装的指定版本，语法与install类似
nvm use ##   // 切换使用指定的版本node
nvm ls  // 列出所有安装的版本 list）
nvm current ##   // 显示当前的版本
nvm reinstall-packages ##    //  在当前版本node环境下，重新全局安装指定版本号的npm包
```

* nvm 不支持 Windows，但是有替代品，也就是nvm-windows


* #  nrm切换npm的源
nrm全称是npm registry manage, 是npm 资源管理器，允许你快速切换npm 源

###     常用命令
```js
npm install -g nrm   // 安装
nrm ls  // 列出可用的源
nrm use taobao  // 选择国内淘宝的源
nrm test npm  // 测试速度
nrm add taobao http://192.168.10.127:8081/repository/npm-public/   // 添加源
nrm del taobao // 删除对应的源
```