<template>
  <header class="text-gray-600 body-font">
    <div
      class="container flex flex-col flex-wrap items-center p-5 mx-auto  md:flex-row"
    >
      <router-link
        class="flex items-center mb-4 font-medium md:mb-0 clickable"
        :to="{ name: 'Index' }"
      >
        <h1 class="logo">Mt Mall</h1>
      </router-link>
      <nav
        class="flex flex-wrap items-center justify-around w-full text-lg  md:justify-center md:ml-auto md:w-auto"
      >
        <router-link
          class="px-1 font-bold md:px-5 text-primary clickable md:mr-5"
          v-for="(headerNav, i) in headerNavLists"
          :key="i"
          :to="{ name: headerNav.routeName }"
          >{{ headerNav.text }}
        </router-link>

        <router-link
          v-if="!user.accessToken"
          class="px-1 font-bold md:px-5 text-primary clickable md:mr-5"
          :to="{ name: 'Login' }"
          >登入
        </router-link>

        <template v-else>
          <p
            class="flex items-center justify-start px-1 font-bold  md:mr-5 md:px-5 text-primary clickable"
          >
            <span>
              <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                />
              </svg>
            </span>

            {{ user.name }}
          </p>
          <p
            @click="onClickLogout"
            class="font-bold md:mr-5 md:px-5 text-primary clickable"
          >
            登出
          </p>
        </template>
      </nav>
      <button
        class="inline-flex items-center px-3 py-1 mt-4 text-base border-0 rounded  focus:outline-none hover:bg-gray-200 md:mt-0"
      >
        <svg class="w-6 h-6 text-primary" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"
          />
        </svg>
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { alertSuccess } from '/@/composable/notification/useSweetAlert'
import { useStore } from '/@/store/store'

export default defineComponent({
  name: 'TheHeader',
  setup() {
    const headerNavLists = [
      {
        text: '首頁',
        routeName: 'Index',
      },
      {
        text: '商品',
        routeName: 'Product',
      },
    ]

    const store = useStore()
    const user = computed(() => store.state.user)
    const router = useRouter()

    const onClickLogout = () => {
      store.dispatch('clearUser')
      alertSuccess('已成功登出')
      router.push({ name: 'Index' })
    }

    return { headerNavLists, user, onClickLogout }
  },
})
</script>

<style>
.logo {
  background-image: url('/@/assets/img/Logo.png');
  width: 112px;
  height: 112px;
  text-indent: 101%;
  white-space: nowrap;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
