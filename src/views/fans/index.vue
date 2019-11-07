<template>
  <div class='container-fans'>
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- tabs组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <!-- 列表 -->
          <div class="fans_list">
            <div class="fans_item" v-for="item in fansList" :key="item.id.toString()">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" size="small" plain>+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import defaultImage from '../../assets/avatar.jpg'
export default {
  data () {
    return {
      fansList: [],
      activeName: 'list',
      defaultImage,
      reqParams: {
        per_page: 21,
        page: 1
      },
      total: 0
    }
  },
  created () {
    this.getFansList()
  },
  methods: {
    pager (newPage) {
      this.reqParams.page = newPage
      this.getFansList()
    },
    async getFansList () {
      const {
        data: { data }
      } = await this.$http.get(`/followers`, { params: this.reqParams })
      // const {
      //   data: { data }
      // } = await this.$http.get(`/followers?page=${this.reqParams.page}&per_page=${this.reqParams.per_page}`)
      console.log(this.$route)

      this.fansList = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.fans_list{
  .fans_item{
    width: 150px;
    height: 190px;
    text-align: center;
    border: 1px dashed #ddd;
    padding-top: 20px;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
</style>
