<template>
  <router-link :to="{ name: 'ProductDetail', params: { id: cartItem.id } }">
    <div
      class="flex items-center justify-between p-6 bg-white border-b  hover:shadow-lg hover:transform hover:-translate-y-1 hover:scale-105 hover:cursor-pointer"
    >
      <div
        class="w-20 h-20 bg-no-repeat bg-cover"
        :style="`background-image: url(${cartItem.image})`"
      ></div>
      <div>
        <h2 class="text-base font-medium">{{ cartItem.title }}</h2>
        <p class="text-sm">x{{ cartItem.count }}</p>
      </div>
      <p>${{ cartItem.price }}</p>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core'

import ProductType from '/@/types/ProductType'

export default defineComponent({
  props: {
    cartItem: {
      type: Object as PropType<ProductType>,
    },
  },
})
</script>

<style lang=""></style>
