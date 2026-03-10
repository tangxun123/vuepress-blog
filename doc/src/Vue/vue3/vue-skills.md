# vue-skills

## 什么是 vue-skills 
vue-skills 是一套专为 AI Agent 设计的 Vue 3 技能增强包，目前在 GitHub 上已获得 1.8k Star。
GitHub 地址：`https://github.com/vuejs-ai/skills`

它的核心思路很直接：把 Vue 3 的最佳实践、常见陷阱、版本特性打包成"技能"注入给 AI，让 Cursor、Claude Code 这类 AI 助手在处理 Vue 相关任务时，能输出真正符合 Vue 3 规范的代码。

## 安装
```js
npx skills add vuejs-ai/skills
```
![选择skills](/assets/select-skills.png)
![选择agents](/assets/select-agents.png)
![选择scope](/assets/select-scope.png)
![选择安装方式](/assets/select-method.png)

## 使用
```js
// 安装后，在提示词前面加上触发词即可激活
Use vue skill, <your prompt here>
```

## 核心 skill 介绍
1. vue-best-practices（最核心）

覆盖 Vue 3 + Composition API + TypeScript 的全套最佳实践
 - 组合式函数的正确拆分方式
 - 响应式数据：何时用 ref，何时用 shallowRef，何时用 reactive
 - 常见性能陷阱（如不必要的深度监听）
 - SSR 场景下的注意事项
 
2. vue-options-api-best-practices

专门针对 Options API 写法（data()、methods、computed）
 - this 上下文的正确用法
 - 生命周期钩子的调用顺序
 - TypeScript 与 Options API 的结合方式
老项目维护、不想迁移 Composition API 的团队，这个 skill 很实用。
3. vue-router-best-practices

Vue Router 4 场景
 - 导航守卫的正确使用姿势
 - 路由参数传递与组件生命周期的关系
 - 动态路由加载的最佳模式
4. vue-pinia-best-practices

Pinia 状态管理
 - Store 的 setup 式写法 vs options 式写法的选择
 - 响应式数据在 store 中的注意点
 - 跨 store 状态共享模式
5. vue-testing-best-practices

测试场景，覆盖 Vitest + Vue Test Utils + Playwright
 - 组件单测的正确写法
 - 异步组件的测试技巧
 - E2E 测试最佳实践
6. vue-jsx-best-practices

Vue 里写 JSX 的注意事项，尤其是和 React JSX 的语法差异——这块 AI 最容易混淆
7. vue-debug-guides

调试向导，实战价值极高
 - 运行时报错解读
 - Vue warn 信息的含义
 - 异步错误处理
 - SSR hydration 问题排查
8. create-adaptable-composable

创建高质量可复用 composable
 - MaybeRef / MaybeRefOrGetter 输入参数模式
 - 让 composable 对响应式数据更"友好"