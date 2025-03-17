---
highlight: a11y-dark
---
## React 之 Hook

### 什么是 Hook?
> Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性`（如 函数式组件）`。

`Hook` 是一些可以让你在 **函数组件** 里`“钩入” React state 及生命周期等特性的函数`。`Hook` **不能在 class 组件中使用** —— 这使得你不使用 class 也能使用 React。

### Hook 使用规则
Hook 就是 JavaScript 函数，但是使用它们会有**两个额外的规则**：

- 只能`在函数最外层调用 Hook`。不要在循环、条件判断或者子函数中调用。
- 只能`在 React 的函数组件中调用 Hook`，不要在其他 JavaScript 函数中调用。（还能在`自定义的 Hook 中调用 Hook`)。


### State Hook
`useState` 会返回一对值：**当前状态** 和一个让你 **更新它的函数**
```js
import React, { useState } from 'react';

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);
  const [todo, setTodo] = useState({dosomething: "aaa"});

  return (
    <div>
      <p>You clicked {count} times</p>
      <p>You clicked {todo.dosomething} times</p>
      <button onClick={() => {
          setCount(count + 1);
          setTodo({dosomething: "bbb"})
      }}>
        Click me
      </button>
    </div>
  );
}
```


### Effect Hook
`useEffect` 就是一个 `Effect Hook`，，给函数组件增加了操作副作用的能力 **（副作用函数）** 。它跟 `class 组件`中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，只不过被合并成了一个 API。

例如，下面这个组件在 React 更新 DOM 后会设置一个页面标题：
```js
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate: 
  // 组件初始渲染及数据更新导致的渲染都会调用 useEffect 内部事件
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
    
    alert("update"); // 每次更新count都会执行
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

副作用函数还可以通过`返回一个函数`，来指定如何`“清除”副作用`（防止引起内存泄露）：
```js
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```
