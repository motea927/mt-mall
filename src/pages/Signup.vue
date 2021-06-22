<template>
  <main class="container p-5 mx-auto">
    <section class="flex justify-center">
      <form
        @submit.prevent="onClickLogin"
        class="w-full max-w-sm mb-12 bg-primary"
      >
        <div class="p-7">
          <h2 class="mb-10 text-4xl font-bold text-center text-light-primary">
            會員註冊
          </h2>
          <BaseInput
            v-model="name"
            placeholder="暱稱"
            type="text"
            :icon="'name'"
            class="mb-4"
            required
          />
          <BaseInput
            v-model="email"
            placeholder="電子信箱"
            type="email"
            :icon="'email'"
            class="mb-4"
            required
          />
          <BaseInput
            v-model="password"
            type="password"
            placeholder="請輸入使用者密碼"
            :icon="'password'"
            class="mb-4"
            required
          />

          <p class="text-light-primary">
            已有帳號嗎？點此
            <router-link
              :to="{ name: 'Login' }"
              class="font-bold text-secondary clickable"
              >登入</router-link
            >
          </p>
        </div>

        <button
          class="flex items-center justify-center w-full py-4 text-2xl font-bold  text-primary clickable bg-secondary"
        >
          註冊

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
  </main>
</template>

<script lang="ts">
// Modules
import { defineComponent, ref } from '@vue/runtime-core'
import { apiSignup } from '/@/composable/api/useUserAPI'
import {
  alertSuccess,
  alertError,
} from '/@/composable/notification/useSweetAlert'
import { useStore } from '/@/store/store'

// Components
import BaseInput from '/@/components/BaseInput.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: { BaseInput },
  setup() {
    const store = useStore()
    const router = useRouter()
    const { user, error, load, isLoading } = apiSignup()

    const name = ref<string>('')
    const email = ref<string>('')
    const password = ref<string>('')

    const onClickLogin = async () => {
      await load({
        name: name.value,
        email: email.value,
        password: password.value,
      })

      if (error.value) return alertError(error.value)
      alertSuccess('註冊成功')
      store.commit('setUser', user.value)
      router.push({ name: 'Index' })
    }

    return { name, email, password, onClickLogin, isLoading }
  },
})
</script>
