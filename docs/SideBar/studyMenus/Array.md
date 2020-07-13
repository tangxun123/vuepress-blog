# 判断某个数据类型 是不是 `Array`类型

1. instanceof
```js
var arr = [1,2,3];
console.log(arr instanceof Array); // true
```

2. Object.prototype.toString.call()
```js
var arr = [1,2,3];
console.log(Object.prototype.toString.call(arr)); // "[object Array]"
```
`此方法还可以检验类型 String Object Number undefined null Function`

3. Array.isArray()
```js
var arr = [1,2,3];
console.log(Array.isArray(arr)); // true
```