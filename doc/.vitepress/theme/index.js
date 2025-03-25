// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import layout from './layout.vue'; // 自定义布局 插槽方式
import './style.css'
import './custom.css'
import 'element-plus/dist/index.css';
import deepSeek from '/components/deepSeek.vue'; // 自定义组件

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: layout,
  enhanceApp({ app, router, siteData }) {
    app.component('deepSeek', deepSeek)
  }
}
