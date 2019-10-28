<template>
  <div>
    <img src="../../assets/520.jpg" alt="">
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('http://ttapi.research.itcast.cn/mp/v1_0/articles').then(res => {
      console.log(res.data)
    }).catch(() => {
      console.log('err')
    })
  }
}
</script>

<style>
    img {
        display: block;
        width: 100%;
    }
</style>
