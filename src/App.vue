<template>
  <TheHeader />
  <router-view></router-view>
  <TheFooter />
</template>

<script lang="ts">
// Modules
import { defineComponent } from 'vue'

// Components
import TheHeader from '/@/components/TheHeader.vue'
import TheFooter from '/@/components/TheFooter.vue'

export default defineComponent({
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
  },
})
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
