<template>
  <main class="container p-5 mx-auto overflow-hidden">
    <section>
      <div class="flex flex-wrap -m-4 md:mb-14">
        <div class="w-full p-4 md:w-2/3">
          <div>
            <h2
              class="w-screen p-4 -mx-5 text-2xl font-bold text-center  md:mx-0 md:w-auto text-primary bg-light-primary"
            >
              您的購物車
            </h2>
            <div class="flex flex-col divide-y divide-gray-1">
              <CartItem v-for="cart in cartLists" :key="cart.id" :cart="cart" />
            </div>
          </div>
        </div>

        <div class="w-full md:p-4 md:w-1/3">
          <div class="p-4 md:bg-primary">
            <h2
              class="p-4 mb-4 text-2xl font-bold text-center text-white  bg-primary md:mb-0"
            >
              訂單摘要
            </h2>

            <hr class="hidden my-4 border-1 border-light-primary md:block" />
            <div
              class="flex items-center justify-between mb-2  text-primary md:text-light-primary"
            >
              <p>小計</p>
              <p>NT$ {{ subTotal }}</p>
            </div>
            <div
              class="flex items-center justify-between mb-4  md:mb-2 text-primary md:text-light-primary"
            >
              <p>運費</p>
              <p>NT$ 60</p>
            </div>
            <div
              class="flex items-center justify-between mb-2 text-xl font-bold  text-primary md:text-white"
            >
              <p>總計</p>
              <p>NT$ {{ subTotal + 60 }}</p>
            </div>
          </div>
          <button
            class="block w-screen p-4 -mx-5 -mb-1 text-2xl font-bold  md:w-full bg-secondary text-primary clickable md:m-0"
          >
            結帳
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script lanng="ts">
// Modules
import { computed } from '@vue/runtime-core'
import { useStore } from '/@/store/store'

// Components
import CartItem from '/@/components/Cart/Carttem.vue'

export default {
  components: { CartItem },
  setup() {
    const store = useStore()
    const cartLists = computed(() => store.state.cart)
    const subTotal = computed(() => {
      if (cartLists.value.length === 0) return 0
      return cartLists.value.reduce((acc, current) => {
        return (acc = acc + current.price * current.count)
      }, 0)
    })
    return { cartLists, subTotal }
  },
}
</script>
