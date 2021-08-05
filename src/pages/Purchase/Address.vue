<template>
  <section class="w-full max-w-md mb-10 md:mr-5">
    <div class="p-5 text-white bg-primary">
      <h2 class="text-4xl font-bold mb-7">運送資訊</h2>

      <div class="flex flex-wrap">
        <div class="w-1/2 pr-2">
          <label class="block mb-2 text-xl font-bold">姓氏</label>
          <BaseInput placeholder="王" />
        </div>

        <div class="w-1/2 pl-2 mb-4">
          <label class="block mb-2 text-xl font-bold">名字</label>
          <BaseInput placeholder="小明" />
        </div>

        <div class="w-full mb-4">
          <label class="block mb-2 text-xl font-bold">電話</label>
          <BaseInput placeholder="0912-345-678" />
        </div>

        <div class="w-full">
          <label class="block mb-2 text-xl font-bold">地址</label>
          <BaseInput placeholder="新北市三重區飲料路34號" />
        </div>
      </div>
    </div>
    <button
      @click="onClickSubmitAddress"
      class="block w-full p-4 text-2xl font-bold  bg-secondary text-primary clickable"
    >
      下一步
    </button>
  </section>
</template>

<script lang="ts">
// Modules
import { defineComponent } from '@vue/runtime-core'
import { useRouter } from 'vue-router'

// Components
import BaseInput from '/@/components/BaseInput.vue'

export default defineComponent({
  components: { BaseInput },
  setup() {
    const router = useRouter()
    const onClickSubmitAddress = () => {
      router.push({
        name: 'PurchaseCredit',
      })
    }

    return { onClickSubmitAddress }
  },
})
</script>

<style></style>
