# Vue3 reactive 实现原理，如何思考

## Vue3 的 reactive 实现原理可以概括为以下几个步骤：

1. reactive 函数接受一个普通对象作为参数，创建一个响应式代理对象 proxy，并返回该代理对象。
2. proxy 对象内部通过 Proxy 实现拦截对代理对象的访问和修改。
3. proxy 对象内部维护一个 WeakMap 对象 rawToReactive，用于将原始对象映射到响应式代理对象。
4. proxy 对象内部维护一个 WeakMap 对象 reactiveToRaw，用于将响应式代理对象映射到原始对象。
5. 在访问代理对象属性时，get 拦截器会根据需要将属性的值转换为响应式对象并返回。如果属性的值是对象，则递归地将其转换为响应式对象。
6. 在修改代理对象属性时，set 拦截器会触发更新。如果新值和旧值不相等，则将新值也转换为响应式对象并将其赋值给代理对象。 在触发更新时，会根据 reactiveToRaw 找到对应的原始对象，然后通过 WeakMap 找到依赖于该原始对象的所有响应式对象，并触发更新。 如果要手动实现 reactive 函数，可以按照以上步骤进行实现。其中最核心的是使用 Proxy 实现对代理对象的拦截，以及通过 WeakMap 来维护响应式对象和原始对象之间的映射关系。具体实现可以参考以下代码：

```js
let activeEffect = null;

function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

function reactive(obj) {
  const observed = new Proxy(obj, {
    get(target, key, receiver) {
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
      trigger(target, key);
    }
  });
  return observed;
}

const targetMap = new WeakMap();

function track(target, key) {
  if (!activeEffect) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  dep.add(activeEffect);
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => effect());
  }
}
```
使用自己手动实现的 reactive 函数可以像使用 Vue 3 的 reactive 函数一样，可以把一个对象传入 reactive 函数中，获取到一个响应式的对象，通过对响应式对象的修改，可以触发相关的依赖更新。以下是一个示例：

```js
// 定义一个普通对象
const obj = {
  count: 0
};

// 使用 reactive 函数创建一个响应式对象
const state = reactive(obj);

// 定义一个 effect 函数，用于监听 count 的变化
effect(() => {
  console.log('count 值变化了：', state.count);
});

// 修改 state 对象中的 count 属性，会触发 effect 函数的执行
state.count++; // 输出：count 值变化了： 1
```
在上述示例中，我们定义了一个普通的对象 obj，通过调用 reactive 函数，获取到了一个响应式对象 state。之后，我们使用 effect 函数监听 state.count 属性的变化，在执行 state.count++ 时，因为 state.count 是响应式的，所以会触发 effect 函数的执行，从而输出 count 值变化了： 1。

需要注意的是，自己手动实现的 reactive 函数只是简单的演示原理，并不完整，还有很多情况没有考虑到，实际使用时建议使用 Vue 3 提供的 reactive 函数。

## Vue3 内部的 reactive 方法绑定的对象是如何把数据展示到视图上的，原理
Vue 3 内部的 reactive 方法是通过使用 ES6 的 Proxy 对象来实现的，它会创建一个代理对象，将这个代理对象返回给调用者。这个代理对象能够拦截针对原始对象的访问和修改，并且会跟踪对这个代理对象的所有访问。这就是 Vue 3 响应式系统的核心。

当你通过模板或者代码中的响应式对象访问到这个代理对象的属性时，它就会触发 get 拦截器函数。在 get 函数中，Vue 3 的响应式系统会将这个依赖收集起来，然后返回被访问的属性的值。这样，当这个属性的值发生改变时，Vue 3 就知道哪些地方需要被更新。

当你通过模板或者代码中的响应式对象修改这个代理对象的属性时，它就会触发 set 拦截器函数。在 set 函数中，Vue 3 的响应式系统会将这个变化通知给所有依赖它的组件，然后再修改这个属性的值。

在实现响应式对象之后，Vue 3 会通过将组件中的模板转换成一个渲染函数来将数据展示到视图上。这个渲染函数会将组件中的所有响应式对象的属性访问转换成对响应式对象的代理对象的访问。当数据发生变化时，渲染函数会重新执行，然后更新视图。Vue 3 的响应式系统使用了这些代理对象来追踪所有的数据依赖，以此实现了高效的视图更新机制。

### 更详细一点

当我们使用 Vue 3 内部的 reactive 方法将一个对象转换为响应式对象时，Vue 实际上会使用 ES6 Proxy 对象来包装这个对象。这个包装后的对象，我们称之为代理对象，它是原始对象的一个镜像，但它拥有比原始对象更多的能力。

代理对象的 get 拦截器函数会被触发当我们读取代理对象的属性值时。在这个拦截器函数中，Vue 的响应式系统会进行依赖收集。依赖收集的意思是，Vue 会记录下当前组件正在访问哪些响应式对象的哪些属性，并建立响应式依赖关系。

依赖收集完成之后，代理对象会将被访问的属性值返回给调用者。因为访问的是代理对象，而非原始对象，所以可以在这个拦截器函数中进行依赖收集的操作，这也是 Vue 实现响应式的重要原理。

当我们通过模板或代码修改代理对象的属性值时，代理对象的 set 拦截器函数会被触发。在这个拦截器函数中，Vue 的响应式系统会将属性的新值与旧值进行比较，如果不同，则会触发更新操作。这个更新操作包括重新渲染组件，并将新的属性值渲染到视图上。

在实际的更新操作中，Vue 会使用虚拟 DOM 和 Diff 算法来进行高效的视图更新。这样，即使我们的数据发生了很多次变化，Vue 也可以快速地计算出需要更新的部分，并且只更新这些部分，而不是全部重新渲染。这就是 Vue 响应式系统的优势所在。

总结一下，Vue 3 的响应式系统的原理是，使用 ES6 Proxy 对象来包装原始对象，建立响应式依赖关系，并在数据变化时，通过虚拟 DOM 和 Diff 算法来进行高效的视图更新。这个响应式系统是 Vue 框架的核心之一，也是 Vue 框架能够实现高效的组件化开发的重要原因。
