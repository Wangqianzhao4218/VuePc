<template>
  <div class="container-pubish">
    <el-card>
      <div slot="header">
        <my-bread>{{$route.query.id?'修改':'发布'}}文章</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="120px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor v-model="articleForm.content"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type" @change="articleForm.cover.images=[]">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if="articleForm.cover.type===1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type===3">
            <my-image v-for="i in 3" :key="i" v-model="articleForm.cover.images[i-1]"></my-image>
          </div>
          <!-- <div>
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image></my-image>
            <my-image></my-image>
          </div>-->
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="$route.query.id">
          <el-button type="primary" @click="change(false)">修改</el-button>
          <el-button  @click="change(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="create(false)">发表</el-button>
          <el-button  @click="create(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: null,
        cover: {
          type: 1,
          images: []
        },
        content: null,
        channel_id: null
      }
    }
  },
  // 富文本配置对象
  editorOption: {
    placeholder: '',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['image']
      ]
    }
  },
  created () {
    // 判断当前是否是编辑
    const articleId = this.$route.query.id
    if (articleId) {
      // 获取当前文章信息
      this.getArticle(articleId)
    }
  },
  methods: {
    async create (draft) {
      // 发表 存入草稿
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      console.log(this.$route)
      // 提示
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      // 去内容管理
      this.$router.push('/article')
    },
    async getArticle (articleId) {
      const { data: { data } } = await this.$http.get('articles/' + articleId)
      // 表单填充  面包屑文字   按钮文字
      this.articleForm = data
    },
    async change (draft) {
      // const a = this.$route.query.id
      await this.$http.put(`articles/${this.articleForm.id}?draft=${draft}`, this.articleForm)
      this.$router.push('/article')
    }
  }
}
</script>

<style scoped lang='less'></style>
