import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TX BLOG",
  description: "personal blog project",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      // { text: "面试重点", link: "/src/Interview/interview" },
      { text: "全部概览", link: "/src/studyMenus/npm" },
    ],

    sidebar: [
      {
        text: "学习随笔",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "VitePress 快速入门", link: "/vitepress-quick-start.md" },
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
