<template>
  <div class="app-container">
    <el-form
      v-loading="isLoading"
      ref="form"
      :model="category"
      label-width="120px"
    >
      <el-form-item
        label="類別名稱"
        prop="category"
        :rules="[
          { required: true, message: '請輸入類別名稱', trigger: 'blur' }
        ]"
      >
        <el-input v-model="category.category" />
      </el-form-item>

      <el-form-item label="是否啓用">
        <el-switch v-model="category.isEnable" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">送出</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addProductCategoryApi } from '@/api/product'

export default {
  data() {
    return {
      category: {
        category: '',
        isEnable: true
      },
      isLoading: false
    }
  },
  methods: {
    onSubmit() {
      const formRef = this.$refs.form
      formRef.validate(isValidated => {
        if (!isValidated) return
        this.isLoading = true
        addProductCategoryApi(this.category)
          .then(response => {
            this.$message('新增成功!')
            this.goToProductCategoryList()
          })
          .catch(err => {
            this.isLoading = false
            console.log(err)
          })
      })
    },
    onCancel() {
      this.$message({
        message: '取消新增，回到商品類別!',
        type: 'warning'
      })
      this.goToProductCategoryList()
    },
    goToProductCategoryList() {
      this.isLoading = false
      this.$router.push({ name: 'ProductCategoryList' })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
