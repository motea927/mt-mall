<template>
  <main class="container p-5 mx-auto">
    <section>
      <img
        src="/@/assets/img/Index/IndexBanner.jpg"
        alt="Index Banner"
        class="mb-12 rounded"
      />
      <div class="mb-12 text-primary">
        <h2 class="mb-5 text-3xl font-bold">熱賣商品</h2>
        <div class="flex flex-wrap -m-4">
          <template v-if="products.length === 0">
            <ProductSkeleton v-for="i in 3" :key="i" />
          </template>
          <template v-else>
            <BaseProduct
              v-for="product in products"
              :key="product._id"
              :product="product"
            />
          </template>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
// Modules
import { defineComponent } from '@vue/runtime-core'
import { getProducts } from '/@/composable/api/useProductAPI'

// Components
import BaseProduct from '/@/components/Product/BaseProduct.vue'
import ProductSkeleton from '/@/components/Product/ProductSkeleton.vue'

export default defineComponent({
  components: { BaseProduct, ProductSkeleton },
  setup() {
    const { products, error, load } = getProducts()
    load({
      _page: 1,
      _limit: 3,
      _sort: 'sales',
      _order: 'desc',
    })
    return { products, error }
  },
})
</script>

<style></style>
