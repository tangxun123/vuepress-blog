# JavaScript 中 call()、apply()、bind() 的用法

**`bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。`**

**`call()、apply()、bind() 都是用来修改 this 指向`**


## 1. 简述 `this` 指向
```js
var obj = {
    name: "张三",
    func: function(){
        console.log(this);
    }
}
obj.func();  // {name: "name", func: ƒ}
```
此时的 this 指向 obj;

```js
var name = "张三";
function func(){
    console.log(this);
    console.log(this.name);
}
func(); // Window // "张三"
```
此时全局声明的函数func(), this 指向 window;


## 2. 使用 `call()、apply()、bind()` 来修改 this 指向
```js
var name = "张三", age = 18;
var obj = {
    name: "李四",
    age: 20,
    func: function(){
        console.log(this.name + this.age + "岁了。");
    }
}
var thisObj = {
    name: "王五",
    age: 22
}
obj.func.call(thisObj);  // 王五22岁了。
obj.func.apply(thisObj); // 王五22岁了。
obj.func.bind(thisObj);  // f() 返回一个函数
obj.func.bind(thisObj)();// 王五22岁了。
```
由上可得出，call()、apply()、bind() 可以用来修改 this 指向 thisObj，只是 bind() 会返回一个函数，必须调用才能执行。


## 3. `call()、apply()、bind()` 传参的对比
```js
var name = "张三", age = 18;
var obj = {
    name: "李四",
    age: 20,
    func: function(city, doThing){
        console.log(this.name + this.age + "岁了，想去" + city + doThing);
    }
}
var thisObj = {
    name: "王五",
    age: 22
}
obj.func.call(thisObj, "北京", "工作");    // 王五22岁了，想去北京工作
obj.func.apply(thisObj, ["北京", "工作"]); // 王五22岁了，想去北京工作
obj.func.bind(thisObj, "北京", "工作")();  // 王五22岁了，想去北京工作
obj.func.bind(thisObj, ["北京", "工作"])();// 王五22岁了，想去北京,工作undefined
```
由上可知，call()、bind()、apply() 这三个函数的
`第一个参数都是 this 的指向对象，指向thisObj`，
第二个参数： `call`的参数是直接逗号隔开，`apply`的所有参数是放在一个数组里传进去，`bind`除了返回一个函数 再调用外，和**call**是一样的。


------


## 由于`bind()`方法每运行一次都会返回一个**新函数**，这会产生一些问题
> 比如监听事件的时候 
```js
element.addEventListener('click', o.m.bind(o));
```
上面代码中，`click`事件绑定`bind()`方法生成的一个匿名函数。这样会导致无法取消绑定，所以下面的代码是无效的。
```js
element.removeEventListener('click', o.m.bind(o));  // 无法注销事件绑定
```
正确写法如下
```js
var listener = o.m.bind(o);
element.addEventListener('click', listener);
//  ...具体逻辑
element.removeEventListener('click', listener);
```

> 详见阮一峰 [this关键字](https://wangdoc.com/javascript/oop/this.html)