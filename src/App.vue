<template>
  <div :data-theme="theme">
    <div class="min-h-screen flex flex-col">
      <HeaderNav :theme="theme" @toggle-theme="toggleTheme" />
      <main class="flex-1 container mx-auto p-4">
        <router-view />
      </main>
      <footer class="p-4 text-center">© Microblog Lab5</footer>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue'
import HeaderNav from './components/HeaderNav.vue'

export default defineComponent({
  components: { HeaderNav },
  setup() {
    const theme = ref('light')

    function toggleTheme() {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', theme.value)
    }

    onMounted(() => {
      const saved = localStorage.getItem('theme')
      if (saved) theme.value = saved
    })

    return { theme, toggleTheme }
  }
})
</script>