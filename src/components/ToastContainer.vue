<template>
  <div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
    <div v-for="t in toasts" :key="t.id" class="px-4 py-2 rounded shadow-lg" :class="toastClass(t.type)">{{ t.text }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ToastService } from '../services/toast.service'

export default defineComponent({
  setup() {
    return { toasts: ToastService.toasts, toastClass(type: string) {
        if (type === 'success') return 'bg-green-500 text-white'
        if (type === 'error') return 'bg-red-500 text-white'
        return 'bg-gray-700 text-white'
      } }
  }
})
</script>