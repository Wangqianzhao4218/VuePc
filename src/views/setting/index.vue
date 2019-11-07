<template>
  <div class="container-setting">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form label-width="120px" size="small">
            <el-form-item label="编号：">{{userInfo.id}}</el-form-item>
            <el-form-item label="手机号：">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userInfo.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button type="primary" @click="saveInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :http-request="uploadPhoto"
            style="text-align:center"
          >
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus.js'
import local from '@/utils/local.js'
export default {
  data () {
    return {
      userInfo: {
        name: null,
        intro: null,
        photo: null
      },
      imageUrl: ''
    }
  },
  async created () {
    const { data: { data } } = await this.$http.get('user/profile')
    this.userInfo = data
  },
  methods: {
    async saveInfo () {
      const { name, intro, email } = this.userInfo
      await this.$http.patch('user/profile', { name, intro, email })
      this.$message.success('保存成功')
      eventBus.$emit('updateName', name)
      const user = local.getUser()
      user.name = name
      local.setUser(user)
    },
    async uploadPhoto ({ file }) {
      const formdata = new FormData()
      formdata.append('photo', file)
      const { data: { data } } = await this.$http.patch('user/photo', formdata)
      this.$message.success('修改头像成功')
      this.userInfo.photo = data.photo
      eventBus.$emit('changphoto', this.userInfo.photo)
      const user = local.getUser()
      user.photo = this.userInfo.photo
      local.setUser(user)
    }
  }
}
</script>

<style>
</style>
