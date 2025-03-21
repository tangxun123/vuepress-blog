# Object.defineProperty 和 Proxy

## Object.defineProperty
1. 定义一个对象
```js
let objData = {
    a: 1,
    b: 2,
    c: {
        d: 3,
        e: 4
    }
}
```
2. 监听`objData`
```js
const isObject = (obj) => {
    return typeof obj === 'object' && obj !== null
}
const observe = (obj) => {
    if (!isObject(obj)) return obj;
    for (const key in obj) {
        let value = obj[key];
        if(isObject(value)) {
            // 在添加监听时，发现属性值依旧是一个obj的时候，递归监听
            observe(value)
        }
        Object.defineProperty(obj, key, {
            get() {
                console.log('get', key, value)
                return value
            },
            set(newValue) {
                console.log('set', key, newValue)
                if (value !== newValue) {
                    value = newValue
                }
            }
        })
    }
}
observe(objData)
objData.c.d; // 读已有属性
objData.c.d = 5; // 改已有属性
objData.f = 6; // 新增属性
objData.f; // 读取新增属性
```
### **总结**：
1. vue2 的数据劫持是通过Object.defineProperty来实现的。
2. 通过递归的方式对对象的每个属性进行劫持，当访问或者修改属性时，会触发get和set方法，从而实现数据的劫持。
3. 但是新增属性时和读取时 是无法监听到的，所以vue2提供了$set方法来实现对新增属性的监听。


## Proxy
1. 定义一个对象
```js
let objData = {
    a: 1,
    b: 2,
    c: {
        d: 3,
        e: 4
    }
}
```

2. 监听`objData`
```js

const isObject = (obj) => {
    return typeof obj === 'object' && obj !== null
}
const reactive = (obj) => {
    if (!isObject(obj))  return obj;
    return new Proxy(obj, {
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver)
            if (isObject(res)) {
                // 访问属性时，发现属性值依旧是一个obj的时候，再次添加监听
                return reactive(res)
            }
            console.log('get', key, res)
            return res
        },
        set(target, key, value, receiver) {
            const res = Reflect.set(target, key, value, receiver)
            console.log('set', key, value)
            return res
        }
    })
}
const proxyObj = reactive(objData); // 使用时，用代理对象，不能使用原始对象
proxyObj.a; // 读已有属性
proxyObj.a = 5; // 改已有属性
proxyObj.c.d; // 读已有属性
proxyObj.c.d = 6; // 改已有属性
proxyObj.c.f = 7; // 新增属性并赋值
```
### **总结**：
1. vue3 的数据劫持是通过es6的Proxy来实现的，可以拦截并自定义更多的操作，包括对属性的读取、写入、删除、遍历、函数调用等。
2. 是对整个对象进行的监听，不需要递归来对每个属性进行劫持，当访问或者修改属性时，会触发get和set方法，从而实现数据的劫持。
3. 新增属性时和读取时 依旧是可以监听到的。


## Vue2 对数组的更新是做了什么处理，相对于 vue3
在 Vue 2 中，当你修改一个数组时，Vue 会使用一些技巧来追踪和更新视图。Vue 2 使用了"劫持"或"拦截"数组的方法来检测到数组的变化。这个过程主要通过重写数组的一些原型方法来实现，比如 push、pop、shift、unshift、splice、sort 和 reverse。

当你调用这些方法来修改数组时，Vue 2 会捕捉到这些操作，并更新相关的视图。Vue 2 还提供了一些辅助方法，比如$set，用于向数组中添加新的元素，以便能够被 Vue 检测到。

然而，Vue 2 对于数组的变化检测是有限的。对于直接通过索引设置元素的情况，Vue 2 无法检测到变化。例如，使用 arr[index] = value 的方式直接设置数组元素的值，Vue 2 无法自动追踪这个变化。

相比之下，Vue 3 对数组的处理进行了改进。Vue 3 使用了 Proxy 对象来追踪数组的变化，而不再依赖于劫持数组的原型方法。Proxy 对象可以拦截到更多的数组操作，包括直接通过索引设置元素的值。这样，Vue 3 能够更精确地追踪数组的变化，并及时更新相关的视图。

总的来说，Vue 3 相对于 Vue 2 在数组的处理上更加高效和准确，能够捕捉到更多的变化，提供更好的性能和开发体验。