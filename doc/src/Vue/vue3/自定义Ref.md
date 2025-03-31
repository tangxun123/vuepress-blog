# customRef自定义Ref

## 实现一个防抖Ref

```js
import { customRef } from 'vue';
function debounceRef(value, delay = 1000) {
  let timer
  return customRef((track, trigger) => {
    return {
      get() {
        // 收集依赖
        track()
        return value
      },
      set(newValue) {
        // 清除之前的定时器
        clearTimeout(timer)
        // 设置新的定时器
        timer = setTimeout(() => {
          value = newValue
          // 派发更新
          trigger()
        }, delay)
      }
    }
  })
}

// demo.vue 用法
<input v-model="iptVal" placeholder="用户名" />
const iptVal = debounceRef('')
```