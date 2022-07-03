<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { reactive } from 'vue'

const data = [
  {
    label: 'docs',
    id: 'node-1',
    level: 1
  },
  {
    label: 'packages',
    id: 'node-2',
    expanded: true,
    level: 1
  },
  {
    label: 'vite',
    id: 'node-2-1',
    parentId: 'node-2',
    expanded: true,
    level: 2
  },
  {
    label: 'README.md',
    id: 'node-2-1-1',
    parentId: 'node-2-1',
    isLeaf: true,
    level: 3
  },
  {
    label: 'scripts',
    id: 'node-3',
    level: 1
  },
  {
    label: 'pnpm-workspace.yaml',
    id: 'node-4',
    level: 1,
    isLeaf: true
  }
]
const TreeData = reactive(data)
</script>

<template>
  <span> 梁乾阳 </span>
  <SButton type="primary">haodx</SButton>
  <STree :data="TreeData" />
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
