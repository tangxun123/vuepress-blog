
let objData = {
    a: 1,
    b: 2,
    c: {
        d: 3,
        e: 4
    }
}
const isObject = (obj) => {
    return typeof obj === 'object' && obj !== null
}
const reactive = (obj) => {
    if (!isObject(obj))  return obj;
    return new Proxy(obj, {
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver)
            if (isObject(res)) {
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
const proxyObj = reactive(objData)
proxyObj.a;
proxyObj.a = 5;
proxyObj.c.d;
proxyObj.c.d = 6;
proxyObj.c.f = 7;