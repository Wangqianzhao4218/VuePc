<template>
  <div class="container-comment">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
        <el-table :data="articles">
          <el-table-column label="标题" width="400" prop="title"></el-table-column>
          <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
          <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.comment_status"
                type="danger"
                size="small"
                @click="close(scope.row.id,false)"
              >关闭</el-button>
              <el-button v-else type="success" size="small" @click="close(scope.row.id,true)">打开</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top:20px"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="pager"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: [],
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      //   console.log(data)
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    async close (id, status) {
      const { data: { data } } = await this.$http.put(`comments/status?article_id=${id}`, {
        allow_comment: status
      })
      this.$message.success(
        data.allow_comment ? '打开评论成功' : '关闭评论成功'
      )
      this.getArticles()
    }
  }
}
</script>

<style>
</style>
