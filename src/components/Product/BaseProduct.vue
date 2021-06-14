<template>
  <div class="w-full p-4 md:w-1/3">
    <div
      class="flex flex-col w-full h-full overflow-hidden transition duration-500 ease-in-out rounded  hover:shadow-lg hover:transform hover:-translate-y-1 hover:scale-105"
    >
      <div
        class="object-cover pb-[95%] bg-cover bg-center bg-no-repeat"
        :style="`background-image: url(${product.image});`"
      ></div>
      <div class="flex text-center">
        <p class="w-7/12 p-3 text-xl border-l">{{ product.title }}</p>
        <p class="w-5/12 p-3 font-bold border-l border-r">
          NT$ {{ product.price }}
        </p>
      </div>
      <button class="block p-4 text-2xl font-bold bg-light-primary clickable">
        加入購物車
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core'
import ProductType from '/@/types/ProductType'

export default defineComponent({
  props: {
    product: {
      require: true,
      type: Object as PropType<ProductType>,
    },
  },
})
</script>

<style></style>
