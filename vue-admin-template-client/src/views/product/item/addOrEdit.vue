<template>
  <div class="app-container">
    <el-form ref="form" :model="product" label-width="120px">
      <el-form-item
        label="商品名稱"
        prop="title"
        :rules="[
          { required: true, message: '請輸入商品名稱', trigger: 'blur' }
        ]"
      >
        <el-input v-model="product.title" />
      </el-form-item>

      <el-form-item
        label="商品價格"
        prop="price"
        :rules="[
          { required: true, message: '請輸入商品價格', trigger: 'blur' }
        ]"
      >
        <el-input v-model="product.price" />
      </el-form-item>

      <el-form-item
        label="商品描述"
        prop="description"
        :rules="[
          { required: true, message: '請輸入商品描述', trigger: 'blur' }
        ]"
      >
        <el-input type="textarea" :rows="5" v-model="product.description" />
      </el-form-item>

      <el-form-item
        label="商品類別"
        prop="categoryId"
        :rules="[
          { required: true, message: '請選擇商品類別', trigger: 'blur' }
        ]"
      >
        <el-select v-model="product.categoryId" placeholder="選擇商品類別">
          <el-option
            v-for="item in categoryLists"
            :key="item._id"
            :label="item.category"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="商品圖片"
        prop="image"
        :rules="[
          { required: true, message: '請上傳商品圖片', trigger: 'blur' }
        ]"
      >
        <el-upload
          :file-list="fileList"
          :multiple="false"
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="onChangeImage"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>

              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">送出</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getProductCategoryApi,
  addProductItemApi,
  updateProductItemApi
} from '@/api/product'

export default {
  data() {
    return {
      product: {
        title: '',
        price: '',
        description: '',
        categoryId: '',
        image: ''
      },
      categoryLists: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: []
    }
  },
  computed: {
    isEditMode() {
      const { name } = this.$route

      return name === 'ProductItemEdit'
    }
  },
  created() {
    console.log(this.isEditMode)

    if (this.isEditMode) {
      const product = this.$route.params.product
      if (!product) return this.$router.push({ name: 'ProductItemList' })
      this.product = product
      console.log(product)
      this.fileList = [{ url: product.image }]
      this.dialogImageUrl = product.image
    }
    this.fetchCategory()
  },
  methods: {
    onSubmit() {
      console.log(this.fileList)
      if (this.fileList[0]) {
        const image =
          this.isEditMode && !this.fileList[0].raw
            ? this.fileList[0].url.replace(process.env.VUE_APP_APP_URL, '')
            : this.fileList[0].raw

        this.product.image = image
      }

      const formRef = this.$refs.form
      formRef.validate(isValidated => {
        if (!isValidated) return
        if (this.isEditMode) {
          console.log(this.product.image)
          const newProduct = {
            title: this.product.title,
            price: this.product.price,
            description: this.product.description,
            categoryId: this.product.categoryId,
            image: this.product.image
          }
          console.log(newProduct)
          updateProductItemApi(newProduct, this.product._id)
            .then(response => {
              this.$message('更改成功!')
              this.goToProductItemList()
            })
            .catch(err => {
              console.log(err)
            })
          return
        }

        addProductItemApi(this.product)
          .then(response => {
            this.$message('新增成功!')
            this.goToProductItemList()
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    onCancel() {
      this.$message({
        message: '動作取消，回到商品管理!',
        type: 'warning'
      })
      this.goToProductItemList()
    },
    goToProductItemList() {
      this.$router.push({ name: 'ProductItemList' })
    },
    fetchCategory() {
      getProductCategoryApi().then(response => {
        console.log(response)
        this.categoryLists = response.data
      })
    },
    handleRemove(file) {
      this.fileList = []
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    onChangeImage(file, fileList) {
      const isPNG = file.raw.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isPNG) {
        this.$message.error('商品圖片僅能爲PNG格式!')
        this.fileList = []
        return
      }
      if (!isLt2M) {
        this.$message.error('上傳商品圖片大小不能超過 2MB!')
        this.fileList = []
        return
      }
      this.fileList = [file]
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
