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
          { text: "DOM", link: "/SideBar/DOM/DOM" },
          { text: "Vue", link: "/SideBar/Vue/组件传值" },
          { text: "G6Demo", link: "/SideBar/G6/G6Demo" },
        ],
      },
      { text: "Github", link: "https://github.com" },
    ],
    sidebarDepth: 2,
    // 侧栏菜单
    sidebar: {
      "/SideBar/Git/": ["Git工作流程及规范"],
      "/SideBar/DOM/": ["DOM"],
      "/SideBar/Vue/": ["组件传值","computed和watch","数据双向绑定原理", "vuex刷新页面数据丢失"],
      "/SideBar/G6/": ["G6Demo"],
      "/SideBar/studyMenus/": [
        "npm",
        "markDown",
        "babel",
        "dist",
        "emotion",
        "Object.defineProperty",
        "call、apply、bind",
        "Array",
        "axios封装"
      ],
    },
    lastUpdated: "Last Updated",
    configureWebpack: {
      output: {
        publicPath: "/",
      },
      module: {
        rules: [
          {
            test: /\.(jsx?|babel|es6)$/,
            use: {
              loader: "babel-loader",
            },
            exclude: /node_modules/,
          },
          {
            test: /\.vue$/,
            loader: "vue-loader",
            options: {
              compilerOptions: {
                preserveWhitespace: false,
              },
            },
          },
        ],
      }
    },
  },
};
