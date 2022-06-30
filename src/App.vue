<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
const handleClick = () => {
  console.log('123')
}
</script>

<template>
  <SButton>
    <div>梁乾阳</div>
  </SButton>
  <s-button type="primary" size="large">确定</s-button>
  <s-button type="primary" size="large" disabled @click="handleClick"
    >禁用</s-button
  >
  <s-button type="primary" block>Confirm</s-button>
  <s-button block>Cancel</s-button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
