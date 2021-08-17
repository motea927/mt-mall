<template>
  <div class="flex flex-wrap items-center justify-between py-5 md:flex-nowrap">
    <div
      class="w-1/2 bg-center bg-no-repeat bg-cover md:w-28 h-28"
      :style="`background-image: url('${appURL}${cart.image}')`"
    ></div>

    <router-link
      :to="{ name: 'ProductDetail', params: { id: cart._id } }"
      class="w-1/2 px-5 text-left  md:text-center md:flex-1 md:w-auto text-primary clickable"
    >
      <h3 class="text-xl md:text-base">{{ cart.title }}</h3>
      <p>NT$ {{ cart.price }}</p>
    </router-link>

    <div
      class="flex items-center justify-end w-full mb-4 text-center  md:flex-1 md:justify-start md:w-auto md:mb-0"
    >
      <button
        @click="onClickSub(cart)"
        class="block w-12 h-12 border border-gray-1 clickable"
      >
        -
      </button>
      <div
        class="flex items-center justify-center w-12 h-12 text-center border-t border-b  border-gray clickable"
      >
        {{ cart.count }}
      </div>
      <button
        @click="onClickAdd(cart)"
        class="block w-12 h-12 border border-gray-1 clickable"
      >
        +
      </button>
    </div>

    <div
      class="flex-shrink-0 w-full text-xl font-bold text-right  md:flex-1 md:text-center md:w-auto text-primary"
    >
      NT$ {{ cart.price * cart.count }}
    </div>

    <div @click="onClickRemove(cart)" class="hidden text-third md:block">
      <svg class="w-6 h-6 ml-auto clickable" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
// Modules
import { computed, defineComponent, PropType } from '@vue/runtime-core'
import ProductType from '/@/types/ProductType'
import { useStore } from '/@/store/store'

export default defineComponent({
  props: {
    cart: {
      type: Object as PropType<ProductType>,
    },
  },
  setup() {
    const store = useStore()
    const cartLists = computed(() => store.state.cart)

    const onClickRemove = (cart: ProductType) => {
      const newCartLists = cartLists.value.filter(
        (_cart) => _cart._id !== cart._id
      )
      store.commit('setCart', newCartLists)
    }

    const onClickSub = (cart: ProductType) => {
      if (cart.count === 1) {
        onClickRemove(cart)
        return
      }
      cart.count--
    }

    const onClickAdd = (cart: ProductType) => {
      cart.count++
    }
    const appURL = import.meta.env.VITE_APP_URL as String
    return { onClickRemove, onClickSub, onClickAdd, appURL }
  },
})
</script>
