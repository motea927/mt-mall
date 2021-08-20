<template>
  <div class="app-container">
    <el-form ref="form" :model="user" label-width="120px">
      <el-form-item
        label="會員暱稱"
        prop="name"
        :rules="[
          { required: true, message: '請輸入會員暱稱', trigger: 'blur' }
        ]"
      >
        <el-input v-model="user.name" />
      </el-form-item>

      <el-form-item
        label="會員信箱"
        prop="email"
        :rules="[
          { required: true, message: '请输入會員信箱', trigger: 'blur' },
          {
            type: 'email',
            message: '請輸入正確的格式',
            trigger: ['blur', 'change']
          }
        ]"
      >
        <el-input v-model="user.email" />
      </el-form-item>

      <el-form-item
        label="會員密碼"
        prop="password"
        :rules="[
          { required: true, message: '請輸入會員密碼', trigger: 'blur' },
          { min: 6, message: '密碼需六位以上', trigger: ['blur', 'change'] }
        ]"
      >
        <el-input v-model="user.password" show-password />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">送出</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createWebUserApi } from '@/api/web-user'

export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      const formRef = this.$refs.form
      formRef.validate(isValidated => {
        if (!isValidated) return

        createWebUserApi(this.user)
          .then(response => {
            this.$message('新增成功!')
            this.goToWebUserList()
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    onCancel() {
      this.$message({
        message: '取消新增，回到會員列表!',
        type: 'warning'
      })
      this.goToWebUserList()
    },
    goToWebUserList() {
      this.$router.push({ name: 'WebUserList' })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
