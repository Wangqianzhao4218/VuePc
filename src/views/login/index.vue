<template>
  <div class="container">
    <!-- 登录卡片 -->
    <el-card>
      <!-- logo -->
        <img src="../../assets/logo_index.png" width="200px" alt />

      <el-form ref="form" :model="loginForm" :rules="loginRules" status-icon >
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            style="width:307px;margin-right:10px"
            placeholder="请输入验证码"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="loginClick">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
    return {
      loginForm: { mobile: '', code: '' },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '验证码6个字符', trigger: 'blur' }]
      }
    }
  },
  methods: {
    loginClick () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$http.post('authorizations', this.loginForm).then(res => {
            this.$router.push('/')
          }).catch(() => {
            this.$message.error('手机号或验证码错误')
          })
        }
      })
    }
  }
}

</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  background: url(../../assets/login_bg.jpg) no-repeat center / cover;
  position: absolute;
  left: 0;
  top: 0;

  .el-card {
  width: 470px;
  height: 370px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  img {
   display: block;
   margin: 0 auto;
   width:200px;
  }
}
}
.el-form {
  margin-top: 30px;
}
</style>
