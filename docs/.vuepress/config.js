module.exports = {
  title: "TXBLOG",
  description: "Vue 驱动的静态网站生成器",
  themeConfig: {
    // 顶部菜单栏
    nav: [
      { text: "首页", link: "/" },
      { text: "学习随笔", link: "/SideBar/studyMenus/npm" },
      {
        text: "知识点",
        ariaLabel: "Study Menu",
        items: [
          { text: "Git", link: "/SideBar/Git/Git工作流程及规范" },
          { text: "vue", link: "/SideBar/vue/vuex" },
        ],
      },
      { text: "Github", link: "https://github.com" },
    ],
    sidebarDepth: 2,
    // 侧栏菜单
    sidebar: {
      '/SideBar/Git/': ['Git工作流程及规范'],
      '/SideBar/vue/': ['vuex'],
      '/SideBar/studyMenus/': ['npm','markDown','babel', 'dist','emotion','Object.defineProperty'],
    }
      // [
      //   ["/SideBar/knowledgePoints", "markdown语法"],
      //   ["/SideBar/babel", "loader、babel版本"],
      //   ["/SideBar/npm", "npm、nrm、nvm常用命令"],
      //   ["/SideBar/Object.defineProperty", "Object.defineProperty()"],
      //   ["/SideBar/dist", "vue项目dist包index文件无法直接打开"],
      //   ["/SideBar/emotion", "vue项目植入微信表情"],
      // ]
    ,
    lastUpdated: 'Last Updated',
    configureWebpack: {
      output: {
        publicPath: '/'
      }
    }
  },
};