# Object.defineProperty()语法说明

**Object.defineProperty()** 的作用就是直接在一个对象上定义一个新属性，或者修改一个已经存在的属性
```js
Object.defineProperty(obj, prop, desc)
```
1. obj 需要定义属性的当前对象
2. prop 当前需要定义的属性名
3. desc 属性描述符

一般通过为对象的属性赋值的情况下，对象的属性可以修改也可以删除，但是通过Object.defineProperty()定义属性，通过描述符的设置可以进行更精准的控制对象属性。

```js
let obj = {};
Object.defineProperty(obj, 'name', {
    value: 'Tom',
    writable: true, // 是否可以修改此属性 默认为false
    configurable: true, // 是否可以删除属性 默认为false
    enumerable: true, // 属性是否会出现在for in 或者Object.key() 的遍历中 默认为false
})
```


```js
let obj = {};
Object.defineProperty(obj, 'name', {
  value: 'Tom',
  writable: false, // 是否可以修改此属性 默认为false
  configurable: true, // 是否可以定义属性或者删除属性 默认为false
})
obj.name = 'Bob';
console.log(obj.name); // Tom  不可直接修改属性

Object.defineProperty(obj, 'name', {
  value: 'Bob',
})
console.log(obj.name); // Bob    configurable: true时，可以对属性进行定义修改
```
1. configurable: false 时，不能删除当前属性，且不能重新配置当前属性的描述符(有一个小小的意外：可以把writable的状态由true改为false,但是无法由false改为true),但是在writable: true的情况下，可以改变value的值
2. configurable: true时，可以删除当前属性，可以配置当前属性所有描述符。
3. 结合writable: false 和 configurable: false 就可以创建一个真正的常量属性（不可修改，不可重新定义或者删除）
4. 如果你想禁止一个对象添加新属性并且保留已有属性，就可以使用Object.preventExtensions(obj)

```js
let obj = {name: 'tom'};
Object.preventExtensions(obj);
obj.name = 'Bob';
obj.age = 18;
console.log(obj); // {name: 'tom'}  禁止对obj进行修改及定义属性
```

**存取描述符---是由一对getter、setter函数功能来描述的属性** 
- **get**：一个给属性提供getter的方法，如果没有getter则为undefined。该方法返回值被用作属性值。默认为undefined。
- **set**：一个给属性提供setter的方法，如果没有setter则为undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认值为undefined。

```js
let obj = {}
Object.defineProperty(obj, 'name', {
  get: function(){
  	return temp;
  },
  set: function(val){
  	temp = val;
  }
})
obj.name = 'Tom';
console.log(obj); // {name:'Tom'}
console.log(obj.name); // Tom
console.log(temp); // Tom
```


