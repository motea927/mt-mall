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
          <button
            @click="onClickAddCart"
            class="px-8 py-4 bg-white text-primary"
          >
            加入購物車
          </button>
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
import { computed, defineComponent, ref, watchEffect } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '/@/store/store'

// Components
import ProductDetailSkeleton from '/@/components/Product/ProductDetailSkeleton.vue'

// API
import { getProducts } from '/@/composable/api/useProductAPI'

export default defineComponent({
  components: { ProductDetailSkeleton },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const id = route.params.id as unknown as string

    const { products, load: loadProduct } = getProducts()

    watchEffect(async () => {
      await loadProduct({
        id,
      })
      if (products.value.length === 0) router.push({ name: 'Index' })
    })

    const buyCount = ref(1)

    watchEffect(() => {
      if (buyCount.value >= 1) return
      buyCount.value = 1
    })

    const store = useStore()
    const cartLists = computed(() => store.state.cart)

    const onClickAddCart = () => {
      const item = cartLists.value.find((product) => product.id === id)

      if (!item) {
        store.commit('setCart', [
          ...cartLists.value,
          {
            ...products.value[0],
            count: 1,
          },
        ])
        return
      }

      const newCartLists = cartLists.value.map((_product) => {
        if (_product.id !== id) return { ..._product }

        return {
          ..._product,
          count: _product.count + 1,
        }
      })
      store.commit('setCart', newCartLists)
    }

    return { products, buyCount, onClickAddCart }
  },
})
</script>

<style>
.product-detail {
  background: linear-gradient(115deg, #c99037 50%, transparent 50.1%) center
    center / 100% 100%;
}
@media (max-width: 768px) {
  .product-detail {
    background: transparent;
  }
}
</style>
