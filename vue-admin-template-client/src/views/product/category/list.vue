<template>
  <div class="app-container">
    <el-row>
      <el-button @click="onClickAddCategory" class="addCategoryButton"
        >新增類別</el-button
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
      <el-table-column label="商品類別">
        <template slot-scope="scope">
          {{ scope.row.category }}
        </template>
      </el-table-column>
      <el-table-column label="商品數量" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.count }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="是否啓用"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.isEnable ? 'success' : 'danger'">{{
            scope.row.isEnable ? '啓用中' : '禁用中'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
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
import { getProductCategoryApi, deleteProductCategoryApi } from '@/api/product'

export default {
  data() {
    return {
      list: [],
      listCount: 0,
      listLoading: true,
      pageSize: 10,
      currentPage: 1
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
      params._skip = this.currentPage
      getProductCategoryApi(params).then(response => {
        this.listCount = +response.headers['x-total-count']
        this.list = response.data
        this.listLoading = false
      })
    },
    handleEdit(index, category) {
      this.$router.push({
        name: 'ProductCategoryEdit',
        params: { category }
      })
    },
    handleDelete(index, category) {
      this.$confirm('此操作將刪除類別及所屬之商品, 是否刪除？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return deleteProductCategoryApi(category._id)
        })
        .then(() => {
          this.fetchData()
        })
    },
    onClickAddCategory() {
      this.$router.push({ name: 'ProductCategoryAdd' })
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
