<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="includeList">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <p>{{ includeList }}</p>
</template>
<script setup lang="ts">
import { watch, reactive } from 'vue'
import { useRouter } from 'vue-router'

// 将需要缓存的页面放入includeList
// 再次进入组件不会触发beforeCreate、created 、beforeMount、 mounted。
let includeList: Array<string> = reactive([])
const useRouterCurrent = reactive(useRouter())
watch(useRouterCurrent, ({ currentRoute: to }: any) => {
  if (to.meta?.keepAlive && includeList.indexOf(to.name) === -1) {
    includeList.push(to.name)
  }
})
</script>
