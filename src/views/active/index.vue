<template>
  <div class="container-active">
    <el-card>
      <div slot="header">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>-->
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道：">
          <!-- <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select> -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>

        <el-form-item label="日期：">
          <div class="block">
            <!-- <span class="demonstration">默认</span> -->
            <el-date-picker
              v-model="dataArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="timeClick"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="screenClick">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px">
      <div slot="header">
        <span>根据筛选条件共查询到 {{total}} 条结果</span>
      </div>

      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- <img :src="scope.row.cover.images[0]" style="width:100px;height:100px">
            -->
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.cover.images[0]"
              fit="fit"
            >
              <div slot="error" class="image-slot">
                <img src="../../assets/error.gif" style="width: 100px; height: 100px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status==1">待审核</el-tag>
            <el-tag v-if="scope.row.status==2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status==3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status==4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="publishClick(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="delClick(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      options: [],
      dataArr: [],
      articles: [],
      total: 0
    }
  },
  methods: {
    async getActive () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.options = data.channels
    },
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
      // console.log(this.articles)
    },
    btnClick (Page) {
      // console.log(page)
      this.reqParams.page = Page
      this.getArticles()
    },
    timeClick (time) {
      // console.log(time)
      this.reqParams.begin_pubdate = time[0]
      this.reqParams.end_pubdate = time[1]
    },
    screenClick () {
      if (this.reqParams.channel_id === '') {
        this.reqParams.channel_id = null
      }
      this.reqParams.page = 1
      this.getArticles()
    },
    publishClick (id) {
      this.$router.push({ path: '/publish', query: { id } })
    },
    async delClick (id) {
      await this.$http.delete(`articles/${id}`)
      this.$message.success('删除文章成功')
      this.getArticles()
    }
  },
  created () {
    this.getActive()
    this.getArticles()
  }
}
</script>

<style>
</style>
