<template>
  <main class="container flex justify-center p-5 mx-auto">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <section class="hidden mb-10 ml-5 md:block">
      <div class="mb-5 border w-80 border-light-primary">
        <div class="text-primary">
          <h2
            class="p-4 mb-4 text-2xl font-bold text-center  text-primary bg-light-primary md:mb-0"
          >
            訂單摘要
          </h2>

          <div class="p-4">
            <div class="flex items-center justify-between mb-2 text-primary">
              <p>小計</p>
              <p>NT$ {{ subTotal }}</p>
            </div>
            <div
              class="flex items-center justify-between mb-4  md:mb-2 text-primary"
            >
              <p>運費</p>
              <p>NT$ 60</p>
            </div>
            <div
              class="flex items-center justify-between mb-2 text-xl font-bold  text-primary"
            >
              <p>總計</p>
              <p>NT$ {{ subTotal + 60 }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="border w-80 border-light-primary">
        <div class="text-primary">
          <h2
            class="p-4 mb-4 text-2xl font-bold text-center  text-primary bg-light-primary md:mb-0"
          >
            購物清單
          </h2>

          <div
            v-for="cartItem in cartLists"
            :key="cartItem._id"
            class="flex items-center justify-start p-4"
          >
            <div
              class="w-1/2 pb-[50%] bg-no-repeat bg-center bg-cover"
              :style="`background-image: url(${appURL}${cartItem.image})`"
            ></div>
            <div class="w-1/2 p-4">
              <p class="mb-1 text-base font-light">
                {{ cartItem.title }} ({{ cartItem.count }})
              </p>
              <p class="text-xl font-bold">
                NT$ {{ cartItem.count * cartItem.price }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
// Modules
import { computed, defineComponent } from '@vue/runtime-core'
import { useStore } from '/@/store/store'

export default defineComponent({
  setup() {
    const store = useStore()
    const cartLists = computed(() => store.state.cart)

    const subTotal = computed(() => {
      if (cartLists.value.length === 0) return 0
      return cartLists.value.reduce((acc, current) => {
        return (acc = acc + current.price * current.count)
      }, 0)
    })

    const appURL = import.meta.env.VITE_APP_URL as String
    return { cartLists, subTotal, appURL }
  },
})
</script>
