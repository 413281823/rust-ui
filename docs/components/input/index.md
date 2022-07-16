# 输入框 - Input
:::demo 这是SInput组件，可以双向绑定你的数据
  ```vue
  <template>
    <SInput v-model="text"/>
    {{text}}
  </template>
  <script setup>
  import {ref} from 'vue'
  const text = ref('')
  </script>
  ```
:::

