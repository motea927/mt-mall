<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="left" label="訂單編號">
        <template slot-scope="scope">
          {{ scope.row._id }}
        </template>
      </el-table-column>

      <el-table-column align="left" label="會員暱稱">
        <template slot-scope="scope">
          {{ scope.row.user ? scope.row.user.name : '已刪除' }}
        </template>
      </el-table-column>

      <el-table-column align="left" label="寄送資訊">
        <template slot-scope="scope">
          <p>
            姓名：
            {{ scope.row.purchaseInformation.lastName }}
            {{ scope.row.purchaseInformation.firstName }}
          </p>
          <p>地址： {{ scope.row.purchaseInformation.address }}</p>
          <p>聯絡電話：{{ scope.row.purchaseInformation.phone }}</p>
        </template>
      </el-table-column>

      <el-table-column align="left" label="購買項目">
        <template slot-scope="scope">
          <div v-for="cartItem in scope.row.cart" :key="cartItem._id">
            {{ cartItem.title }} {{ cartItem.price }} * {{ cartItem.count }}
          </div>
        </template>
      </el-table-column>

      <el-table-column align="left" label="訂單金額">
        <template slot-scope="scope">
          {{ scope.row.totalPrice }}
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
import { getOrderApi } from '@/api/order'

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
      params._skip = this.currentPage
      getOrderApi(params).then(response => {
        this.listCount = +response.headers['x-total-count']
        this.list = response.data
        this.listLoading = false
      })
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
