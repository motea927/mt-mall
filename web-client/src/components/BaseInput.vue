<template>
  <input
    :value="modelValue"
    @input="onInput"
    type="text"
    class="w-full px-5 py-4 bg-no-repeat  bg-left-input focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-primary bg-light-primary"
    :style="style"
    :class="icon ? 'pl-12' : ''"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/runtime-core'
import emailIcon from '/@/assets/img/BaseInput/Email.svg'
import passwordIcon from '/@/assets/img/BaseInput/Password.svg'
import nameIcon from '/@/assets/img/BaseInput/Name.svg'

export default defineComponent({
  props: {
    modelValue: {
      type: String as PropType<string>,
    },
    icon: {
      type: String as PropType<'email' | 'password' | 'name'>,
      required: false,
    },
  },
  setup(props, ctx) {
    const style = computed(() => {
      if (!props.icon) return ''
      if (props.icon === 'email') return `background-image: url(${emailIcon});`
      if (props.icon === 'password')
        return `background-image: url(${passwordIcon});`
      if (props.icon === 'name') return `background-image: url(${nameIcon});`
    })
    const onInput = (e: Event) => {
      const inputEl = e.target as HTMLInputElement
      ctx.emit('update:modelValue', inputEl.value)
    }
    return { style, onInput }
  },
})
</script>

<style></style>
