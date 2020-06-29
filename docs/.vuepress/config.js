module.exports = {
  title: "TXBLOG",
  description: "Vue 驱动的静态网站生成器",
  themeConfig: {
    // 顶部菜单栏
    nav: [
      { text: "主页", link: "/" },
      { text: "Github", link: "https://github.com" },
      {
        text: "选择语言",
        ariaLabel: "Language Menu",
        items: [
          { text: "中文", link: "/language/chinese" },
          { text: "英文", link: "/language/english" },
        ],
      },
    ],
    sidebarDepth: 2,
    // 侧栏菜单
    sidebar: [
      ["/SideBar/markDown", "markdown语法"],
      ["/SideBar/babel", "loader、babel版本"],
      ["/SideBar/npm", "npm、nrm、nvm常用命令"],
      ["/SideBar/Object.defineProperty", "Object.defineProperty()"],
      ["/SideBar/dist", "vue项目dist包index文件无法直接打开"],
    ],
  },
};