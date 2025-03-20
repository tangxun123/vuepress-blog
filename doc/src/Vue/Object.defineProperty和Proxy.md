## **Object.defineProperty**
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


## **Proxy**
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
1. vue3 的数据劫持是通过es6的Proxy来实现的。
2. 是对整个对象进行的监听，不需要递归来对每个属性进行劫持，当访问或者修改属性时，会触发get和set方法，从而实现数据的劫持。
3. 新增属性时和读取时 依旧是可以监听到的。