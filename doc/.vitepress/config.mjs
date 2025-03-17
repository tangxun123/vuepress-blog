import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TX BLOG",
  description: "personal blog project",
  outDir: "dist",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      // { text: "面试重点", link: "/src/Interview/interview" },
      { text: "全部概览", link: "/src/Git/Git工作流程及规范" },
    ],

    sidebar: [
        {
        text: "Git",link: "/src/Git/Git工作流程及规范"
      },
      {
        text: "学习随笔",
        collapsed: true,
        items: [
          { text: "npm", link: "/src/studyMenus/npm" },
          { text: "markDown", link: "/src/studyMenus/markDown" },
          { text: "babel", link: "/src/studyMenus/babel" },
          { text: "dist", link: "/src/studyMenus/dist" },
          { text: "emotion", link: "/src/studyMenus/emotion" },
          { text: "Object.defineProperty", link: "/src/studyMenus/Object.defineProperty" },
          { text: "call、apply、bind", link: "/src/studyMenus/call、apply、bind" },
          { text: "Array", link: "/src/studyMenus/Array" },
          { text: "axios封装", link: "/src/studyMenus/axios封装" },
          { text: "正则表达式", link: "/src/studyMenus/正则表达式" },
        ],
      },
      {
        text: "Vue",
        collapsed: true,
        items: [
          { text: "组件传值", link: "/src/Vue/组件传值" },
          { text: "computed和watch", link: "/src/Vue/computed和watch" },
          { text: "数据双向绑定原理", link: "/src/Vue/数据双向绑定原理" },
          { text: "vuex刷新页面数据丢失", link: "/src/Vue/vuex刷新页面数据丢失" },
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
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
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
