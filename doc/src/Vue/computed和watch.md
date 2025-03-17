# computed 和 watch 的区别

## 计算属性 computed

- 支持缓存，只有依赖数据发生改变，才会重新进行计算

- 不支持异步，当`computed`内有异步操作时无效，无法监听数据的变化

- `computed`属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，
  也就是基于`data`中声明过或者父组件传递的`props`中的数据通过计算得到的值

- 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用`computed`

- 如果`computed`属性属性值是函数，那么默认会走`get`方法；
  函数的返回值就是属性的属性值；
  在`computed`中的，属性都有一个`get`和一个`set`方法，当数据变化时，调用`set`方法。

```js
computed: {
    fullName: function () {
        return this.firstName + ' ' + this.lastName
    }
}
```

---

- 计算属性默认只有`getter`，不过在需要时你也可以提供一个`setter`

```js
computed: {
  fullName: {
    // getter
    get() {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set(newValue, oldValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

- 现在再运行`vm.fullName = 'John Doe'`时，`setter`会被调用，`vm.firstName`和`vm.lastName`也会相应地被更新

## 侦听属性 watch

- 不支持缓存，数据变，直接会触发相应的操作；

- `watch`支持异步；

- 监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；

- 当一个属性发生变化时，需要执行对应的操作；一对多；

- 监听数据必须是`data`中声明过或者父组件传递过来的`props`中的数据，当数据变化时，触发其他操作，函数有两个参数：

> `immediate: true`：组件加载立即触发回调函数执行

```js
watch: {
  firstName: {
    handler(newName, oldName) {
      this.fullName = newName + ' ' + this.lastName;
    },
    // 代表在 wacth 里声明了 firstName 这个方法之后立即执行 handler 方法
    immediate: true
  }
}
```

> `deep: true` 的意思就是深入观察，监听器会**一层层的往下遍历**，
> 给对象的所有属性都加上这个监听器，但是这样**性能开销就会非常大**了，
> 任何修改 `obj` 里面任何一个属性都会触发这个监听器里的 `handler`

- 下面例子用来监听`obj`, 其实真正需要监听的只是`obj.a`, 这样就会造成性能的不必要消耗

```js
watch: {
  obj: {
    handler(newName, oldName) {
      console.log('obj.a changed');
    },
    immediate: true,
    deep: true
  }
}
```

- 可以`优化`为以下形式, 这样`vue`会一层层解析下去, 在遇到属性`a`的时候, 才会给`a`设置监听函数

```js
watch: {
  "obj.a": {
    handler(newName, oldName) {
      console.log('obj.a changed');
    },
    immediate: true,
    // deep: true
  }
}
```
