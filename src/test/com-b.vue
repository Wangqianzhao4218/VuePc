<template>
  <div class="com-b">
      我是B
      <button @click="btnClick">点击</button>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      msg: '组件B的数据'
    }
  },
  methods: {
    btnClick () {
      eventBus.$emit('B2A', this.msg)
    }
  }
}
</script>

<style>

</style>
