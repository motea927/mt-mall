<template>
  <section class="w-full max-w-md mb-10 md:mr-5">
    <form @submit.prevent="onClickSubmitCredit">
      <div class="p-5 text-white bg-primary">
        <h2 class="text-4xl font-bold mb-7">付款</h2>

        <div class="flex flex-wrap">
          <div class="w-full mb-4">
            <label class="block mb-2 text-xl font-bold">信用卡卡號</label>
            <BaseInput
              v-model="creditObj.cardNo"
              placeholder="4000-2211-1111-1111"
              v-maska="'####-####-####-####'"
              required
              pattern=".{19,19}"
            />
          </div>

          <div class="w-1/2 pr-2 mb-4">
            <label class="block mb-2 text-xl font-bold">持卡人姓氏</label>
            <BaseInput
              v-model="creditObj.cardLastName"
              placeholder="王"
              required
            />
          </div>

          <div class="w-1/2 pl-2 mb-4">
            <label class="block mb-2 text-xl font-bold">持卡人名字</label>
            <BaseInput
              v-model="creditObj.cardFirstName"
              placeholder="小明"
              required
            />
          </div>

          <div class="w-1/2 pr-2 mb-4">
            <label class="block mb-2 text-xl font-bold">有效期限月</label>
            <BaseInput
              v-model="creditObj.cardExpMonth"
              v-maska="'##'"
              pattern="\d{2}"
              placeholder="月"
              required
            />
          </div>

          <div class="w-1/2 pl-2 mb-4">
            <label class="block mb-2 text-xl font-bold">有效期限年</label>
            <BaseInput
              v-model="creditObj.cardExpYear"
              v-maska="'##'"
              pattern="\d{2}"
              placeholder="年"
              required
            />
          </div>

          <div class="w-full">
            <label class="block mb-2 text-xl font-bold">背面末三碼</label>
            <BaseInput
              v-model="creditObj.cardCvc"
              v-maska="'###'"
              pattern="\d{3}"
              placeholder="123"
              required
            />
          </div>
        </div>
      </div>
      <button
        class="flex items-center justify-center w-full p-4 text-2xl font-bold  bg-secondary text-primary clickable"
      >
        下一步
        <svg
          v-if="isLoading"
          class="w-6 h-6 ml-1 animate-spin"
          t="1623854180880"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4191"
        >
          <path
            fill="currentColor"
            d="M510.5 958.7c-60.4 0-119-11.8-174.2-35.2-53.3-22.5-101.1-54.8-142.2-95.9s-73.3-88.9-95.9-142.2C74.9 630.2 63 571.6 63 511.2s11.8-119 35.2-174.2c22.5-53.3 54.8-101.1 95.9-142.2S283 121.5 336.3 99c55.2-23.3 113.8-35.2 174.2-35.2 49.3 0 97.8 8 144.1 23.7 26.1 8.9 40.1 37.3 31.2 63.4-7.1 20.8-26.5 33.9-47.3 33.9-5.3 0-10.8-0.9-16.1-2.7-35.9-12.2-73.6-18.4-111.9-18.4-92.8 0-180 36.1-245.7 101.8C199.2 331.1 163 418.4 163 511.2c0 92.8 36.1 180 101.8 245.7 65.6 65.6 152.9 101.8 245.7 101.8s180-36.1 245.7-101.8C821.8 691.3 858 604 858 511.2c0-58.6-14.9-116.6-43-167.6-13.3-24.2-4.6-54.6 19.6-67.9 24.2-13.3 54.6-4.6 67.9 19.6 36.3 65.7 55.4 140.4 55.4 215.9 0 60.4-11.8 119-35.2 174.2-22.5 53.3-54.8 101.1-95.9 142.2-41.1 41.1-88.9 73.3-142.2 95.9-55.1 23.3-113.7 35.2-174.1 35.2z"
            p-id="4192"
          ></path>
        </svg>
      </button>
    </form>
  </section>
</template>

<script lang="ts">
// Modules
import { defineComponent, ref } from '@vue/runtime-core'
import { useStore } from '/@/store/store'
import { useRouter } from 'vue-router'
import {
  alertSuccess,
  alertError,
} from '/@/composable/notification/useSweetAlert'

// Components
import BaseInput from '/@/components/BaseInput.vue'

// Types
import PurchaseCreditType from '/@/types/PurchaseCreditType'

// Api
import { apiCreateNewOrder } from '../../composable/api/useOrderAPI'

export default defineComponent({
  components: { BaseInput },
  setup() {
    const store = useStore()
    const router = useRouter()

    if (!store.state.purchaseAddress.lastName) {
      router.push({ name: 'Index' })
    }

    const creditObj = ref<PurchaseCreditType>({
      cardLastName: '',
      cardFirstName: '',
      cardExpMonth: '',
      cardExpYear: '',
      cardCvc: '',
      cardNo: '',
    })

    const { order, load, error, isLoading } = apiCreateNewOrder()
    const onClickSubmitCredit = async () => {
      const addressObj = store.state.purchaseAddress
      const cart = store.state.cart
      const user = store.state.user

      await load(user, { ...addressObj, ...creditObj.value }, cart)

      if (error.value) return alertError(error.value)

      alertSuccess('購買成功')
      store.commit('setCart', [])
      router.push({ name: 'Index' })
    }

    return { creditObj, onClickSubmitCredit, isLoading }
  },
})
</script>

<style></style>
