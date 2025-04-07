
# Vue2 Vue3  nextTick原理，为什么存在
Vue2 和 Vue3 的 nextTick 都是为了解决异步更新 DOM 时的问题而存在的。

在 Vue 中，当我们修改数据时，Vue 会把要更新的 DOM 先打上标记，然后把这些标记放到一个队列里，最后异步地更新队列中的所有标记，以达到减少 DOM 操作的目的。这样的机制称为异步更新队列。

由于 JavaScript 的单线程机制，DOM 更新的异步操作需要等到所有同步操作（如事件处理、setTimeout 等）执行完毕后才会执行。如果没有异步更新队列，Vue 在同步修改数据后，立即进行 DOM 更新，此时可能得到的还是旧数据，从而导致问题。

在 Vue2 中，nextTick 的实现机制是将要更新的操作放到一个队列中，通过宏任务 setTimeout 或 setImmediate 实现异步更新。

而在 Vue3 中，nextTick 已经被移除了，取而代之的是 queuePostFlushCb，它是一个内部实现机制，当异步队列中所有标记都已更新后，就会执行 queuePostFlushCb 中的回调函数。这种实现方式比 Vue2 中的 nextTick 更加高效，并且能够更好地控制 DOM 的更新时机。

总的来说，nextTick 机制的存在是为了解决 DOM 更新异步化的问题，而实现机制则是通过将要更新的操作放到异步队列中，等待同步操作执行完毕后再执行。

## 模拟实现 Nexttick

### Vue 2 版本的 nextTick 实现:

```js
<div id="app">{{ message }}</div>
```
```js
new Vue({
  el: '#app',
  data: {
    message: 'Hello World'
  },
  mounted() {
    this.$nextTick(() => {
      console.log('updated');
    });
  }
});
```

```js
Vue.prototype.$nextTick = function (fn) {
  return nextTick(fn, this);
};

const callbacks = [];
let pending = false;

function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

let timerFunc;

if (typeof Promise !== 'undefined') {
  const p = Promise.resolve();
  timerFunc = () => {
    p.then(flushCallbacks);
  };
} else if (typeof MutationObserver !== 'undefined') {
  let counter = 1;
  const observer = new MutationObserver(flushCallbacks);
  const textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = () => {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick(cb, ctx) {
  let _resolve;
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise((resolve) => {
      _resolve = resolve;
    });
  }
}
```


### Vue 3 版本的 nextTick 实现：

```js
<div id="app">{{ message }}</div>
```

```js
const app = Vue.createApp({
  data() {
    return {
      message: 'Hello World'
    };
  },
  mounted() {
    this.$nextTick(() => {
      console.log('updated');
    });
  }
});

app.mount('#app');
```

```js
let isFlushPending = false;
let isPending = false;

let queue = [];
let flushIndex = 0;

function nextTick(fn) {
  queue.push(fn);

  if (!isPending) {
    isPending = true;
    Promise.resolve().then(flushJobs);
  }
}

function flushJobs() {
  isPending = false;
  isFlushPending = true;

  queue.sort((a, b) => a.id - b.id);

  for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
    const job = queue[flushIndex];
    job();
  }

  queue.length = 0;
  isFlushPending = false;
}

let id = 0;

function createJob(fn) {
  return {
    id: ++id,
    fn
  };
}

Vue.prototype.$nextTick = function (fn) {
  const job = createJob(fn);
  nextTick(job.fn);
};
```

## nextTick 总结

1. nextTick 的作用
- nextTick 是 Vue 提供的一个全局 API,用于在下次 DOM 更新循环结束之后执行延迟回调
- 当数据发生变化时,Vue 不会立即更新 DOM,而是将更新操作放入异步队列
- 使用 nextTick 可以在 DOM 更新完成后再执行某些操作

2. 实现原理
- Vue 会维护一个异步更新队列
- 当数据变化时,将要更新的 watcher 推入队列
- 通过 Promise.then 等微任务来异步执行队列中的更新操作
- nextTick 的回调也会被加入这个队列,确保在 DOM 更新后执行

3. 使用场景
- 在修改数据后立即操作新 DOM 时
- 在 created 钩子中需要操作 DOM 时
- 在数据变化后需要获取更新后的 DOM 中的值时

4. Vue2 和 Vue3 的区别
- Vue2 中通过原型方法 $nextTick 调用
- Vue3 中可以直接导入 nextTick 方法使用
- Vue3 的实现更加简洁高效,使用 Promise 微任务

5. 注意事项
- nextTick 是异步执行的,要注意代码的执行顺序
- 多个 nextTick 会被合并到一个异步任务中执行
- 在实际开发中要合理使用,避免过度依赖

