<style lang="less" scoped>
@import 'index';
</style>
<template>
  <div>home{{ msg }}</div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import Http from '../../utils/axios/index'
export default defineComponent({
  name: 'home',
  setup() {
    let msg = reactive({ msg: 'home1' })
    const getData = () => {
      Http.get('url').then((res: Object) => {
        console.log(res)
      })
    }

    return {
      msg,
      getData,
    }
  },
})
</script>
