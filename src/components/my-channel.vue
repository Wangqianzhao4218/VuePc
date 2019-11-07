<template>
  <el-select :value="value" placeholder="请选择" @change="fn">
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      //   value: null,
      options: []
    }
  },
  methods: {
    async getActive () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.options = data.channels
    },
    fn (channelID) {
      if (channelID === '') channelID = null
      this.$emit('input', channelID)
    }
  },
  created () {
    this.getActive()
  }
}
</script>

<style>
</style>
