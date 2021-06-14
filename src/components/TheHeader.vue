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
        class="flex flex-wrap items-center justify-center text-base md:ml-auto"
      >
        <router-link
          class="mr-5 font-bold text-primary clickable"
          v-for="(headerNav, i) in headerNavLists"
          :key="i"
          to="#"
          >{{ headerNav.text }}
        </router-link>
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
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'TheHeader',
  setup() {
    const headerNavLists = [
      {
        text: '首頁',
      },
      {
        text: '商品',
      },
      {
        text: '登入',
      },
    ]

    return { headerNavLists }
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
