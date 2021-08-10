<template>
  <main class="bg-gray-50">
    <section class="container p-5 mx-auto">
      <template v-if="isLoading">
        <OrderCardSkeleton v-for="i in 3" :key="i" />
      </template>
      <template v-else>
        <template v-if="orderLists.length !== 0">
          <OrderCard
            v-for="(order, idx) in orderLists"
            :key="idx"
            :order="order"
          />
        </template>
        <template v-else>
          <BaseEmpty>
            <p class="mb-5 text-center animate-bounce">
              您的訂單記錄爲空，立刻
              <router-link
                :to="{ name: 'Product' }"
                class="border-b-2 border-primary clickable"
                >前往購買吧</router-link
              >
              ！！
            </p>
          </BaseEmpty>
        </template>
      </template>
    </section>
  </main>
</template>

<script lang="ts">
// Modules
import { defineComponent } from '@vue/runtime-core'

// Components
import OrderCard from '/@/components/OrderDetail/OrderCard.vue'
import OrderCardSkeleton from '/@/components/OrderDetail/OrderCardSkeleton.vue'
import BaseEmpty from '/@/components/BaseEmpty.vue'

// Api
import { apiGetOrder } from '/@/composable/api/useOrderAPI'

export default defineComponent({
  components: { OrderCard, OrderCardSkeleton, BaseEmpty },
  setup() {
    const { orderLists, load, error, isLoading } = apiGetOrder()
    load()
    return { isLoading, orderLists }
  },
})
</script>

<style></style>
