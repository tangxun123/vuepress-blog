import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TX BLOG",
  description: "personal blog project",
  outDir: "../dist",
  ignoreDeadLinks: true, // 忽略死连接
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.jpg',
    search: {
      provider: 'local',
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "全部概览", link: "/src/Git/Git工作流程及规范" },
      { text: "面试重点", link: "/src/Interview/interview" },
      // {
      //   component: 'deepSeek'
      // }
    ],

    sidebar: [
      { text: "Git",link: "/src/Git/Git工作流程及规范" },
      {
        text: "Vue",
        collapsed: true,
        items: [
          { text: "Object.defineProperty和Proxy", link: "/src/Vue/Object.defineProperty和Proxy" },
          { text: "路由模式", link: "/src/Vue/路由模式" },
          { text: "vue面试题", link: "/src/Vue/vue面试题" },
          { 
            text: "vue2", 
            collapsed: true,
            items: [
              { text: "组件通信", link: "/src/Vue/vue2/组件传值" },
              { text: "数据双向绑定原理", link: "/src/Vue/vue2/数据双向绑定原理" },
              { text: "computed和watch", link: "/src/Vue/vue2/computed和watch" },
              { text: "vuex刷新页面数据丢失", link: "/src/Vue/vue2/vuex刷新页面数据丢失" },
              { text: "生成二维码", link: "/src/Vue/vue2/生成二维码" },
            ] 
          },
          { 
            text: "vue3", 
            collapsed: true,
            items: [
              { text: "组件通信", link: "/src/Vue/vue3/组件通信" },
              { text: "Reactive", link: "/src/Vue/vue3/reactive" },
              { text: "nextTick", link: "/src/Vue/vue3/nextTick" },
              { text: "自定义Ref", link: "/src/Vue/vue3/自定义Ref" },
              { text: "vite打包优化", link: "/src/Vue/vue3/vite打包优化" },
            ] 
          },
        ],
      },
      {
        text: "React",
        collapsed: true,
        items: [
          { text: "Hook", link: "/src/React/Hook" },
          { text: "ReactNative 启动页空白", link: "/src/ReactNative/启动页空白" },
          { text: "Android打包APK", link: "/src/ReactNative/Android打包APK" },
          { text: "Navigation导航器", link: "/src/ReactNative/Navigation导航器" },
        ],
      },
      {
        text: "每日一学",
        collapsed: true,
        items: [
          { text: "对象数组去重", link: "/src/js/对象数组去重" },
          { text: "取数组的交集并集差集", link: "/src/js/取数组的交集并集差集" },
          { text: "Promise 实现", link: "/src/js/Promise 实现" },
          { text: "前端图片优化", link: "/src/js/前端图片优化" },
          { text: "for循环，中断外层循环", link: "/src/js/for循环，中断外层循环" },
          { text: "防抖和节流", link: "/src/js/防抖和节流" },
        ],
      },
      {
        text: "学习随笔",
        collapsed: true,
        items: [
          { text: "nginx 使用技巧", link: "/src/studyMenus/nginx" },
          { text: "markDown", link: "/src/studyMenus/markDown" },
          { text: "DOM", link: "/src/DOM/DOM" },
          { text: "npm、nvm、nrm", link: "/src/studyMenus/npm" },
          { text: "Object.defineProperty", link: "/src/studyMenus/Object.defineProperty" },
          { text: "判断是否是Array类型", link: "/src/studyMenus/Array" },
          { text: "axios封装", link: "/src/studyMenus/axios封装" },
          { text: "Canvas使用", link: "/src/Canvas/canvas" },
          { text: "babel", link: "/src/studyMenus/babel" },
          { text: "dist包如何在浏览器中直接打开", link: "/src/studyMenus/dist" },
          { text: "emotion表情", link: "/src/studyMenus/emotion" },
          { text: "call、apply、bind的用法和区别", link: "/src/studyMenus/call、apply、bind" },
          { text: "正则表达式", link: "/src/studyMenus/正则表达式" },
          { text: "网站一键置灰", link: "/src/studyMenus/网站一键置灰" },
          { text: "对流式数据的渲染", link: "/src/studyMenus/对流式数据的渲染" },
          { text: "内存泄露和闭包、作用域", link: "/src/studyMenus/内存泄露和闭包、作用域" },
          { text: "sessionStorage、localStorage、cookie", link: "/src/studyMenus/sessionStorage、localStorage、cookie" },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/' },
    ],

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short", // full
        timeStyle: "short", // medium
      },
    },
  }
})
