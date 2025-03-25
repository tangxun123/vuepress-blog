# for循环，中断外层循环

## js Label标记

```js
outer: for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    console.log(i,'--',j);
    if(i > 5 && j  > 5) {
      break outer;
    }
  }
}
```

## 变量

```js
for (let i = 0; i < 9; i++) {
  let flag = false;
  for (let j = 0; j < 9; j++) {
    console.log(i,'--',j);
    if(i > 5 && j  > 5) {
      flag = true;
      break;
    }
  }
  if(flag) break;
}
```