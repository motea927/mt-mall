<template>
  <main class="container p-5 mx-auto">
    <ProductDetailSkeleton v-if="products.length === 0" />
    <section
      v-else
      class="
        flex flex-wrap
        mb-12
        overflow-hidden
        rounded
        shadow-2xl
        product-detail
        min-h-[600px]
      "
    >
      <div
        class="order-last w-full p-5 text-white  md:order-first md:w-1/2 bg-primary md:bg-transparent"
      >
        <h2 class="mb-12 text-3xl font-bold">{{ products[0].title }}</h2>
        <h3 class="mb-5 text-xl">商品描述</h3>
        <p class="mb-12 text-base leading-relaxed">
          {{ products[0].description }}
        </p>
        <p class="mb-12 text-3xl font-bold">${{ products[0].price }}</p>
        <div class="flex justify-start w-full">
          <input
            v-model.number="buyCount"
            type="number"
            min="1"
            class="w-20 font-bold text-center text-white border-2 border-white  bg-primary"
          />
          <button class="px-8 py-4 bg-white text-primary">加入購物車</button>
        </div>
      </div>
      <div class="flex items-center justify-center w-full md:p-5 md:w-1/2">
        <img
          :src="products[0].image"
          alt=""
          class="object-cover w-full md:w-52"
        />
      </div>
    </section>
  </main>
</template>

<script lang="ts">
// Modules
import { defineComponent, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { getProducts } from '/@/composable/api/useProductAPI'

// Components
import ProductDetailSkeleton from '/@/components/Product/ProductDetailSkeleton.vue'

export default defineComponent({
  components: { ProductDetailSkeleton },
  setup() {
    const route = useRoute()
    const id = route.params.id as unknown as string

    const { products, load: loadProduct } = getProducts()

    loadProduct({
      id,
    })

    const buyCount = ref(1)

    return { products, buyCount }
  },
})
</script>

<style>
.product-detail {
  background: linear-gradient(115deg, #c99037 50%, transparent 50%) center
    center / 100% 100%;
}
@media (max-width: 768px) {
  .product-detail {
    background: transparent;
  }
}
</style>
