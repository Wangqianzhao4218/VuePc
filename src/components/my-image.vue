<template>
  <div class="my-image">
    <div class="btn_box" @click="open">
      <img :src="value || btnImage" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <el-radio-group v-model="reqParams.collect" size="small" @change="Toggle">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img_list">
            <div
              class="img_item"
              v-for="item in images"
              :key="item.id"
              @click="selected(item.url)"
              :class="{selected:selectedImage===item.url}"
            >
              <img :src="item.url" alt />
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
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
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
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local.js'
import defaultImage from '../assets/default.png'
export default {
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'first',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      total: 0,
      selectedImage: null,
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      },
      imageUrl: null,
      btnImage: defaultImage
    }
  },
  methods: {
    open () {
      this.dialogVisible = true
      this.getImages()
    },
    Toggle () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    pageClick (newPage) {
      console.log(newPage)
      this.reqParams.page = newPage
      this.getImages()
    },
    selected (url) {
      this.selectedImage = url
    },
    handleAvatarSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
    },
    confirmImage () {
      if (this.activeName === 'first') {
        if (!this.selectedImage) {
          return this.$message.warning('请选择一张图片')
        }
        // this.btnImage = this.selectedImage
        this.$emit('input', this.selectedImage)
        this.dialogVisible = false
      } else {
        if (!this.imageUrl) {
          return this.$message.warning('请上传一张图片')
        }
        // this.btnImage = this.imageUrl
        this.$emit('input', this.imageUrl)
        this.dialogVisible = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.btn_box {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  float: left;
  margin-right: 20px;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.img_list {
  padding-top: 20px;
  .img_item {
    width: 150px;
    height: 120px;
    position: relative;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    &.selected::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
        center / 50px 50px;
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
