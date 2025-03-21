# Promise 实现

```js
class MyPromise {
  // 定义Promise的三种状态
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled'; 
  static REJECTED = 'rejected';

  constructor(executor) {
    // 初始化状态为pending
    this.status = MyPromise.PENDING;
    // 存储成功状态的值
    this.value = undefined;
    // 存储失败状态的值
    this.reason = undefined;
    // 存储成功回调函数队列
    this.onFulfilledCallbacks = [];
    // 存储失败回调函数队列
    this.onRejectedCallbacks = [];

    // resolve处理函数
    const resolve = (value) => {
      if(this.status === MyPromise.PENDING) {
        this.status = MyPromise.FULFILLED;
        this.value = value;
        // 执行成功回调
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    }

    // reject处理函数
    const reject = (reason) => {
      if(this.status === MyPromise.PENDING) {
        this.status = MyPromise.REJECTED;
        this.reason = reason;
        // 执行失败回调
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }

    try {
      // 立即执行executor
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // then方法
  then(onFulfilled, onRejected) {
    // 处理参数默认值
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    // 返回新的Promise以实现链式调用
    const promise2 = new MyPromise((resolve, reject) => {
      if(this.status === MyPromise.FULFILLED) {
        // 创建微任务等待promise2完成初始化
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            // 处理返回值
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        })
      }

      if(this.status === MyPromise.REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        })
      }

      if(this.status === MyPromise.PENDING) {
        // 存储回调函数
        this.onFulfilledCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          })
        });

        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          })
        });
      }
    });

    return promise2;
  }
}

// 处理Promise解析过程
function resolvePromise(promise2, x, resolve, reject) {
  // 如果promise2与x相等，抛出循环引用错误
  if(promise2 === x) {
    reject(new TypeError('Chaining cycle detected for promise'));
  }

  if(x instanceof MyPromise) {
    // 如果x是Promise实例，调用then方法处理
    x.then(resolve, reject);
  } else {
    // 如果x是普通值，直接resolve
    resolve(x);
  }
}

export default MyPromise;
```