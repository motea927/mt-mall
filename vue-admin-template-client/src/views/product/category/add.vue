<template>
  <div class="app-container">
    <el-form ref="form" :model="category" label-width="120px">
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
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      category: {
        category: '',
        isEnable: true
      }
    }
  },
  methods: {
    onSubmit() {
      const formRef = this.$refs.form
      formRef.validate(isValidated => {
        if (!isValidated) return
        addProductCategoryApi(this.category)
          .then(response => {
            this.$message('新增成功!')
            this.goToProductCategoryList()
          })
          .catch(err => {
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
