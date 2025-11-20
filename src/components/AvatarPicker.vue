<template>
  <div class="flex gap-2 flex-wrap">
    <button v-for="(a, i) in avatars" :key="i" class="btn btn-ghost p-0" @click="select(a)">
      <img :src="a" class="w-16 h-16 rounded-full border-2" :class="{ 'ring ring-primary': selected === a }" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType, watch } from 'vue'
export default defineComponent({
  props: {
    avatars: { type: Array as PropType<string[]>, required: true },
    modelValue: { type: String as PropType<string>, required: false }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selected = ref<string>(props.modelValue || props.avatars[0] || '')

    watch(() => props.modelValue, v => {
      if (v) selected.value = v
    })

    function select(a: string) {
      selected.value = a
      emit('update:modelValue', a)
    }

    return { avatars: props.avatars, selected, select }
  }
})
</script>