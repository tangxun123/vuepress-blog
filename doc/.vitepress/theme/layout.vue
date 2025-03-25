<template>
  <Layout>
    <!-- <template #home-hero-image>
        <img src="/logo.jpg" alt="logo" class="logo" />
    </template> -->
    <template #nav-bar-content-after>
      <button class="full-width-button" @click="openDeepSeek">DeepSeek</button>
      <button class="full-width-button" @click="changeFullWidth">{{fullWidth ? '默认布局' : '宽屏布局'}}</button>
    </template>
    <template #aside-outline-before>
        <div class="outline-title">页面导航</div>
    </template>
  </Layout>
  <deepSeek v-model.visible="visible"></deepSeek>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { ref } from 'vue';
import deepSeek from '../../components/deepSeek.vue';
const { Layout } = DefaultTheme;

const fullWidth = ref(false);
const changeFullWidth = () => {
  fullWidth.value = !fullWidth.value;
  document.getElementsByTagName('html')[0].classList.toggle('layout-full-width');
  document.querySelector('.VPDoc.has-aside .content-container').classList.toggle('container-full-width');
}
const visible = ref(false)
const openDeepSeek = () => {
  visible.value = true;
}
</script>

<style>
.full-width-button {
    font-size: 14px;
    line-height: 24px;
    font-weight: 500;
    margin-left: 1em;
}
.layout-full-width {
  --vp-layout-max-width: 100%;
}
.container-full-width {
  max-width: 100% !important;
}
.outline-title{
    padding-left: 16px;
    line-height: 32px;
    font-size: 14px;
    font-weight: 600;
}
</style>