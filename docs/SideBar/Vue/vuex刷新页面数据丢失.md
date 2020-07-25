# vuex 刷新页面后新数据丢失

1. 用`sessionStorage`或者`localStorage`存储数据

```js
// 存储
sessionStorage.setItem("key", JSON.stringify(value));

// 得到的值为字符串类型，用 JSON.parse() 转
sessionStorage.getItem("key");
```

2. 引入插件`vuex-persist`

- 安装

```js
npm install --save vuex-persist
`or`
yarn add vuex-persist
```

- 引入至 store/index.js

```js
import VuexPersistence from "vuex-persist";
```

- 创建对象以进行配置

```js
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});
```

- 引入此插件

```js
const store = new Vuex.Store({
  state: { ... },
  mutations: { ... },
  actions: { ... },
  plugins: [vuexLocal.plugin]
})
```

> **通过以上设置，在各个页面之间跳转，如果刷新某个视图，数据并不会丢失，依然存在，并且不需要在每个`mutations`中手动存取`storage`。**