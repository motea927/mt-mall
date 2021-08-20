<template>
  <div class="app-container">
    <el-row>
      <el-button @click="onClickAddProduct" class="addCategoryButton"
        >新增商品</el-button
      >
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="商品名稱">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品價格">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品圖片">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.image"
            fit="contain"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品類別">
        <template slot-scope="scope">
          {{ scope.row.category }}
        </template>
      </el-table-column>

      <el-table-column label="已售數量" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sales }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >編輯</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >刪除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.listCount"
      class="pagination"
    >
    </el-pagination>
  </div>
</template>
<script>
import { getProductItemApi, deleteProductItemApi } from '@/api/product'

export default {
  data() {
    return {
      list: [],
      listCount: 0,
      listLoading: true,
      currentPage: 1,
      pageSize: 10
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true

      const params = {}
      params._limit = this.pageSize
      params._page = this.currentPage
      getProductItemApi(params).then(response => {
        this.listCount = +response.headers['x-total-count']
        this.list = response.data.map(item => ({
          ...item,
          image: `${process.env.VUE_APP_APP_URL}${item.image}`
        }))
        this.listLoading = false
      })
    },
    handleEdit(index, product) {
      this.$router.push({
        name: 'ProductItemEdit',
        params: { product }
      })
    },
    handleDelete(index, product) {
      this.$confirm('此操作將刪除商品, 是否刪除？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true
          return deleteProductItemApi(product._id)
        })
        .then(() => {
          this.listLoading = false
          this.fetchData()
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    onClickAddProduct() {
      this.$router.push({ name: 'ProductItemAdd' })
    }
  }
}
</script>

<style>
.addCategoryButton {
  margin-bottom: 20px;
}

.pagination {
  text-align: right;
  margin-top: 20px;
}
</style>
