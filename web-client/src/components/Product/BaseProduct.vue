<template>
  <div class="w-full p-4 md:w-1/3">
    <div
      @click="
        $router.push({ name: 'ProductDetail', params: { id: product._id } })
      "
      class="flex flex-col w-full h-full overflow-hidden transition duration-500 ease-in-out rounded  hover:shadow-lg hover:transform hover:-translate-y-1 hover:scale-105 hover:cursor-pointer"
    >
      <div
        class="object-cover pb-[95%] bg-cover bg-center bg-no-repeat border"
        :style="`background-image: url(${appURL}${product.image});`"
      ></div>
      <div class="flex text-center">
        <p class="w-7/12 p-3 text-xl border-l">{{ product.title }}</p>
        <p class="w-5/12 p-3 font-bold border-l border-r">
          NT$ {{ product.price }}
        </p>
      </div>
      <button
        @click.stop="onClickAddCart(product)"
        class="block p-4 text-2xl font-bold bg-light-primary clickable"
      >
        加入購物車
      </button>
    </div>
  </div>
</template>

<script lang="ts">
// Modules
import { computed, defineComponent, PropType } from '@vue/runtime-core'
import { useStore } from '/@/store/store'

// Types
import ProductType from '/@/types/ProductType'

export default defineComponent({
  props: {
    product: {
      require: true,
      type: Object as PropType<ProductType>,
    },
  },
  setup() {
    const appURL = import.meta.env.VITE_APP_URL as String
    const store = useStore()
    const cartLists = computed(() => store.state.cart)
    const onClickAddCart = (product: ProductType) => {
      const item = cartLists.value.find(
        (_product) => product._id === _product._id
      )

      if (!item) {
        store.commit('setCart', [
          ...cartLists.value,
          {
            ...product,
            count: 1,
          },
        ])
        return
      }

      const newCartLists = cartLists.value.map((_product) => {
        if (_product._id !== product._id) return { ..._product }
        return {
          ..._product,
          count: _product.count + 1,
        }
      })
      store.commit('setCart', newCartLists)
    }

    return {
      onClickAddCart,
      appURL,
    }
  },
})
</script>

<style></style>
