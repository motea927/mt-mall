<template>
  <li
    class="flex items-center justify-center text-xl text-center border  w-14 h-14 text-primary clickable"
    :class="{
      'text-white': isActive,
      'bg-primary': isActive,
      'border-l': showLeftBorder,
      'border-l-0': !showLeftBorder,
    }"
  >
    {{ text }}
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core'

export default defineComponent({
  props: {
    showLeftBorder: {
      required: false,
      default: false,
      type: Boolean as PropType<boolean>,
    },
    text: {
      required: true,
      default: '&lsaquo;',
      type: String as PropType<string>,
    },
    isActive: {
      required: true,
      default: false,
      type: Boolean as PropType<boolean>,
    },
  },
})
</script>

<style></style>
