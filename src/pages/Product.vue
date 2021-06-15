<template>
  <main class="container p-5 mx-auto">
    <section>
      <div class="mb-12 text-primary">
        <div class="flex flex-wrap -m-4">
          <div
            class="flex flex-col w-full p-4 text-2xl font-bold text-center  md:w-1/3"
          >
            <h2 class="py-4 text-white bg-primary">商品類別</h2>
            <ul class="border">
              <li
                v-for="(category, i) in categories"
                :key="i"
                class="py-4 border-t cursor-pointer hover:bg-light-primary"
                :class="{
                  'bg-light-primary': category.category === currentCategory,
                }"
                @click="onClickCategory(category.category)"
              >
                {{ category.category }} ({{ category.count }})
              </li>
            </ul>
          </div>

          <div class="flex flex-wrap w-full md:w-2/3">
            <template v-if="products.length === 0">
              <ProductSkeleton v-for="i in 6" :key="i" class="md:w-1/2" />
            </template>

            <BaseProduct
              v-for="product in products"
              :key="product.id"
              :product="product"
              class="md:w-1/2"
            />

            <BasePagination
              class="w-full ml-auto"
              v-model="currentPage"
              :perPage="6"
              :total="productCount"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
// Modules
import { defineComponent, ref, watchEffect } from '@vue/runtime-core'
import { getProducts, getCategories } from '/@/composable/api/useProductAPI'

// Components
import BaseProduct from '/@/components/Product/BaseProduct.vue'
import ProductSkeleton from '/@/components/Product/ProductSkeleton.vue'
import BasePagination from '/@/components/BasePagination.vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  components: { BaseProduct, ProductSkeleton, BasePagination },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const currentCategory = ref<string>('所有商品')

    const { products, load: loadProduct, count: productCount } = getProducts()

    const onClickCategory = (category: string) => {
      currentCategory.value = category
      currentPage.value = 1
    }

    const currentPage = ref<number>(1)

    const { categories, load: loadCategory } = getCategories()

    watchEffect(() => {
      if (route.name !== 'Product') return
      router.push(
        `/product?category=${currentCategory.value}&page=${currentPage.value}`
      )
    })

    watchEffect(() => {
      if (route.query.category)
        currentCategory.value = route.query.category as string
      if (route.query.page) currentPage.value = +route.query.page
    })

    watchEffect(() => {
      loadProduct({
        _page: currentPage.value,
        _limit: 6,
        category:
          currentCategory.value === '所有商品' ? '' : currentCategory.value,
      })
    })

    loadCategory()

    return {
      currentCategory,
      onClickCategory,
      products,
      currentPage,
      categories,
      productCount,
    }
  },
})
</script>
