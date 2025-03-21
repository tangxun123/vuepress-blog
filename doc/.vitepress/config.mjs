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
      {
        component: 'demo'
      }
    ],

    sidebar: [
      { text: "Git",link: "/src/Git/Git工作流程及规范" },
      {
        text: "Vue",
        collapsed: true,
        items: [
          { text: "Object.defineProperty和Proxy", link: "/src/Vue/Object.defineProperty和Proxy" },
          { 
            text: "vue2", 
            collapsed: true,
            items: [
              { text: "组件传值", link: "/src/Vue/vue2/组件传值" },
              { text: "数据双向绑定原理", link: "/src/Vue/vue2/数据双向绑定原理" },
              { text: "computed和watch", link: "/src/Vue/vue2/computed和watch" },
              { text: "vuex刷新页面数据丢失", link: "/src/Vue/vue2/vuex刷新页面数据丢失" },
            ] 
          },
          { 
            text: "vue3", 
            collapsed: true,
            items: [
              { text: "组件传值", link: "/src/Vue/vue3/组件传值" },
              { text: "生成二维码", link: "/src/Vue/vue3/生成二维码" },
              { text: "Reactive", link: "/src/Vue/vue3/reactive" },
              { text: "nextTick", link: "/src/Vue/vue3/nextTick" },
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
        ],
      },
      {
        text: "学习随笔",
        collapsed: true,
        items: [
          { text: "markDown", link: "/src/studyMenus/markDown" },
          { text: "DOM", link: "/src/DOM/DOM" },
          { text: "npm", link: "/src/studyMenus/npm" },
          { text: "Object.defineProperty", link: "/src/studyMenus/Object.defineProperty" },
          { text: "Array", link: "/src/studyMenus/Array" },
          { text: "axios封装", link: "/src/studyMenus/axios封装" },
          { text: "Canvas", link: "/src/Canvas/markDowcanvasn" },
          { text: "babel", link: "/src/studyMenus/babel" },
          { text: "dist", link: "/src/studyMenus/dist" },
          { text: "emotion", link: "/src/studyMenus/emotion" },
          { text: "call、apply、bind", link: "/src/studyMenus/call、apply、bind" },
          { text: "正则表达式", link: "/src/studyMenus/正则表达式" },
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
