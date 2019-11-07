<template>
  <div class="container-image">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div>
        <el-radio-group v-model="reqParams.collect" size="small" @change="Toggle">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          type="success"
          size="small"
          style="float:right"
          @click="open"
        >添加素材</el-button>
        <div class="img_list">
          <div class="img_item" v-for="item in images" :key="item.id">
            <img :src="item.url" alt />
            <div class="footer">
              <span
                class="el-icon-star-off"
                :class="{red:item.is_collected}"
                @click="Collect(item)"
              ></span>
              <span class="el-icon-delete" @click="delClick(item.id)"></span>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="this.reqParams.page"
        @current-change="pageClick"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px" style="text-align:center">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :headers="headers"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local.js'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  methods: {
    open () {
      this.dialogVisible = true
      this.imageUrl = null
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      //   console.log(data.results)
      this.images = data.results
      this.total = data.total_count
    },
    pageClick (newPage) {
      console.log(newPage)
      this.reqParams.page = newPage
      this.getImages()
    },
    Toggle () {
      this.reqParams.page = 1
      this.getImages()
    },
    async Collect (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      item.is_collected = data.collect
      this.$message.success(item.is_collected ? '收藏成功' : '已取消收藏')
    },
    delClick (id) {
      if (confirm('确认删除该图片?')) {
        this.$http.delete(`user/images/${id}`).then(() => {
          this.$message.success('删除成功')
          this.getImages()
        })
      }
    },
    handleAvatarSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      setTimeout(() => {
        this.dialogVisible = false
        this.getImages()
      }, 2000)
    }
  },
  created () {
    this.getImages()
  }
}
</script>

<style scoped lang='less'>
.img_list {
  padding-top: 20px;
  .img_item {
    width: 180px;
    height: 180px;
    position: relative;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      width: 100%;
      text-align: center;
      color: #fff;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
