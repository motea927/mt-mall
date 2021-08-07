<template>
  <main class="container p-5 mx-auto">
    <section>
      <div class="flex flex-wrap -m-4 md:mb-14">
        <div class="w-full p-4 md:w-2/3">
          <div>
            <h2
              class="
                relative
                w-screen
                p-4
                text-2xl
                font-bold
                text-center
                ml-[-50vw]
                left-1/2
                md:left-auto md:w-auto md:ml-0
                text-primary
                bg-light-primary
              "
            >
              您的購物車
            </h2>
            <div class="flex flex-col divide-y divide-gray-1">
              <template v-if="cartLists.length !== 0">
                <CartItem
                  v-for="cart in cartLists"
                  :key="cart.id"
                  :cart="cart"
                />
              </template>
              <template v-else>
                <BaseEmpty
                  ><p class="mb-5 text-center animate-bounce">
                    您的訂單記錄爲空，立刻
                    <router-link
                      :to="{ name: 'Product' }"
                      class="border-b-2 border-primary clickable"
                      >前往購買吧</router-link
                    >
                    ！！
                  </p></BaseEmpty
                >
              </template>
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
            @click="onClickPurchase"
            class="
              block
              w-screen
              p-4
              relative
              left-1/2
              ml-[-50vw]
              -mb-1
              text-2xl
              font-bold
              md:w-full md:left-auto
              bg-secondary
              text-primary
              clickable
              md:m-0
            "
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
import { computed, defineComponent } from '@vue/runtime-core'
import { useStore } from '/@/store/store'
import { useRouter } from 'vue-router'
import { alertError } from '/@/composable/notification/useSweetAlert'

// Components
import CartItem from '/@/components/Cart/CartItem.vue'
import BaseEmpty from '/@/components/BaseEmpty.vue'

export default defineComponent({
  components: { CartItem, BaseEmpty },
  setup() {
    const store = useStore()
    const router = useRouter()

    const cartLists = computed(() => store.state.cart)
    const subTotal = computed(() => {
      if (cartLists.value.length === 0) return 0
      return cartLists.value.reduce((acc, current) => {
        return (acc = acc + current.price * current.count)
      }, 0)
    })

    const onClickPurchase = () => {
      if (cartLists.value.length === 0) {
        alertError('請選購商品')
        return
      }
      router.push({ name: 'Purchase' })
    }

    return { cartLists, subTotal, onClickPurchase }
  },
})
</script>
