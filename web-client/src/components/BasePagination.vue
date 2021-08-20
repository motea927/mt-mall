<template>
  <div class="p-4">
    <ul class="flex items-start justify-end w-full">
      <BasePaginationItem
        :text="'&lsaquo;'"
        :isActive="false"
        :showLeftBorder="true"
        @click="onClickPrev"
      />
      <BasePaginationItem
        v-for="page in pageLists"
        :key="page"
        :text="`${page}`"
        :isActive="page === modelValue"
        @click="onClickPaginationItem(page)"
      />
      <BasePaginationItem
        :text="'&rsaquo;'"
        :isActive="false"
        @click="onClickNext"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/runtime-core'
import BasePaginationItem from '/@/components/BasePaginationItem.vue'

export default defineComponent({
  props: {
    total: {
      required: true,
      default: 25,
      type: Number as PropType<number>,
    },
    perPage: {
      required: true,
      default: 3,
      type: Number as PropType<number>,
    },
    modelValue: {
      required: true,
      default: 1,
      type: Number as PropType<number>,
    },
  },
  components: { BasePaginationItem },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const totalPage = computed(() => {
      return Math.ceil(props.total / props.perPage)
    })

    const pageLists = computed(() => {
      const result = [] as number[]
      if (props.modelValue + 2 <= totalPage.value) {
        let index = props.modelValue
        const count = props.modelValue + 2
        while (index <= count && index <= totalPage.value) {
          result.push(index)
          index++
        }
        return result
      } else {
        let index = totalPage.value
        const count = props.modelValue - 2
        while (index >= count && index >= 1) {
          result.push(index)
          index--
        }
        return result.reverse()
      }
    })

    const onClickPrev = () => {
      if (props.modelValue === 1) return
      ctx.emit('update:modelValue', props.modelValue - 1)
    }

    const onClickNext = () => {
      if (props.modelValue === totalPage.value) return
      ctx.emit('update:modelValue', props.modelValue + 1)
    }

    const onClickPaginationItem = (page: number) => {
      ctx.emit('update:modelValue', page)
    }

    return {
      pageLists,
      onClickPrev,
      onClickNext,
      onClickPaginationItem,
    }
  },
})
</script>

<style></style>
