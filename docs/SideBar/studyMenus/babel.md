# babel-loader与babel-core版本冲突

**loade**r是一种打包的方案，**webpack默认只识别js结尾的文件**，当遇到其他格式的文件后，webpack并不知道如何去处理。此时，我们可以定义一种规则，告诉webpack当他遇到某种格式的文件后，去求助于相应的loader。

其中babel-loader能识别转换jsx文件及es6语法，babel-core是babel的核心，若是想要用babel-loader把es6的代码转换成为es5的代码，那么你就需要对应版本的babel-core

```js
npm install --save-dev babel-loader babel-core
```
上述指令直接安装后，babel-loader版本可能会与babel-core版本冲突，导致运行报错

```js
"devDependencies": {
    "babel-core": "^6.26.3", 
    "babel-loader": "^8.0.4",
    "css-loader": "^3.5.3",
    "html-webpack-plugin": "^4.3.0",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.11.0"
  }
```

需知：**babel-loader 8.x 对应 babel-core 7.x  ，babel-loader 7.x 对应 babel-core 6.x**

###  解决方案如下：

此时删除babel-core的包，执行`npm i @babel/core -D`　，　使用`@babel/core`代替`babel-core`来安装