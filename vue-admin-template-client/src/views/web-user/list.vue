<template>
  <div class="app-container">
    <el-row>
      <el-button @click="onClickAddProduct" class="addCategoryButton"
        >新增會員</el-button
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
      <el-table-column align="center" label="會員暱稱">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="會員信箱">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="註冊時間">
        <template slot-scope="scope">
          {{ getDateString(scope.row.createdAt) }}
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
import { getWebUserApi, deleteWebUserApi } from '@/api/web-user'
import dayjs from 'dayjs'

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
    getDateString(timestamp) {
      return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
    },
    fetchData() {
      this.listLoading = true
      const params = {}
      params._limit = this.pageSize
      params._skip = this.currentPage
      getWebUserApi(params).then(response => {
        this.listCount = +response.headers['x-total-count']
        this.list = response.data
        this.listLoading = false
      })
    },
    handleEdit(index, user) {
      this.$router.push({
        name: 'WebUserEdit',
        params: { user }
      })
    },
    handleDelete(index, user) {
      this.$confirm('此操作將刪除會員, 是否刪除？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(user)
          return deleteWebUserApi(user._id)
        })
        .then(() => {
          this.fetchData()
        })
    },
    onClickAddProduct() {
      this.$router.push({ name: 'WebUserAdd' })
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
