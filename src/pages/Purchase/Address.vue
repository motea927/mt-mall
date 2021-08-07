<template>
  <section class="w-full max-w-md mb-10 md:mr-5">
    <form @submit.prevent="onClickSubmitAddress">
      <div class="p-5 text-white bg-primary">
        <h2 class="text-4xl font-bold mb-7">運送資訊</h2>

        <div class="flex flex-wrap">
          <div class="w-1/2 pr-2">
            <label class="block mb-2 text-xl font-bold">姓氏</label>
            <BaseInput
              v-model="addressObj.lastName"
              placeholder="王"
              required
            />
          </div>

          <div class="w-1/2 pl-2 mb-4">
            <label class="block mb-2 text-xl font-bold">名字</label>
            <BaseInput
              v-model="addressObj.firstName"
              placeholder="小明"
              required
            />
          </div>

          <div class="w-full mb-4">
            <label class="block mb-2 text-xl font-bold">手機</label>
            <BaseInput
              v-model="addressObj.phone"
              v-maska="'####-###-###'"
              placeholder="0912-345-678"
              pattern="09\d{2}-\d{3}-\d{3}"
              required
            />
          </div>

          <div class="w-full">
            <label class="block mb-2 text-xl font-bold">地址</label>
            <BaseInput
              v-model="addressObj.address"
              placeholder="新北市三重區飲料路34號"
              required
            />
          </div>
        </div>
      </div>
      <button
        class="block w-full p-4 text-2xl font-bold  bg-secondary text-primary clickable"
      >
        下一步
      </button>
    </form>
  </section>
</template>

<script lang="ts">
// Modules
import { defineComponent, ref } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { useStore } from '/@/store/store'
import { alertError } from '/@/composable/notification/useSweetAlert'

// Components
import BaseInput from '/@/components/BaseInput.vue'

// Types
import PurchaseAddressType from '/@/types/PurchaseAddressType'

export default defineComponent({
  components: { BaseInput },
  setup() {
    const router = useRouter()
    const store = useStore()

    const addressObj = ref<PurchaseAddressType>({
      lastName: '',
      firstName: '',
      phone: '',
      address: '',
    })

    const onClickSubmitAddress = () => {
      const phone = addressObj.value.phone.replaceAll('-', '')
      const regex = /09\d{8}/

      if (!regex.test(phone)) {
        alertError('手機格式不符')
        return
      }

      store.commit('setPurchaseAddress', addressObj)

      router.push({
        name: 'PurchaseCredit',
      })
    }

    return { addressObj, onClickSubmitAddress }
  },
})
</script>

<style></style>
