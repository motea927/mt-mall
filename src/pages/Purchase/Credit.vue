<template>
  <section class="w-full max-w-md mb-10 md:mr-5">
    <div class="p-5 text-white bg-primary">
      <h2 class="text-4xl font-bold mb-7">付款</h2>

      <div class="flex flex-wrap">
        <div class="w-full mb-4">
          <label class="block mb-2 text-xl font-bold">信用卡卡號</label>
          <BaseInput placeholder="4000-2211-1111-1111" />
        </div>

        <div class="w-1/2 pr-2 mb-4">
          <label class="block mb-2 text-xl font-bold">持卡人姓氏</label>
          <BaseInput placeholder="王" />
        </div>

        <div class="w-1/2 pl-2 mb-4">
          <label class="block mb-2 text-xl font-bold">持卡人名字</label>
          <BaseInput placeholder="小明" />
        </div>

        <div class="w-1/2 pr-2 mb-4">
          <label class="block mb-2 text-xl font-bold">有效期限月</label>
          <BaseInput placeholder="月" />
        </div>

        <div class="w-1/2 pl-2 mb-4">
          <label class="block mb-2 text-xl font-bold">有效期限年</label>
          <BaseInput placeholder="月" />
        </div>

        <div class="w-full">
          <label class="block mb-2 text-xl font-bold">背面末三碼</label>
          <BaseInput placeholder="123" />
        </div>
      </div>
    </div>
    <button
      class="block w-full p-4 text-2xl font-bold  bg-secondary text-primary clickable"
    >
      下一步
    </button>
  </section>
</template>

<script lang="ts">
// Modules
import { defineComponent } from '@vue/runtime-core'

// Components
import BaseInput from '/@/components/BaseInput.vue'

export default defineComponent({
  components: { BaseInput },
  setup() {},
})
</script>

<style></style>
