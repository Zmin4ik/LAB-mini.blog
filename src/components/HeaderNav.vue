<template>
  <div class="navbar bg-base-200 rounded-box">
    <div class="flex-1">
      <router-link to="/" class="btn btn-ghost normal-case text-xl">Microblog</router-link>
    </div>

    <div class="flex-none flex items-center gap-2">
      <router-link to="/" class="btn btn-ghost">Feed</router-link>

      <router-link
          :to="{ name: 'CreateAuthor' }"
          class="btn btn-ghost"
      >
        New Author
      </router-link>

      <router-link
          :to="{ name: 'CreatePost' }"
          class="btn btn-ghost"
      >
        New Post
      </router-link>

      <button class="btn btn-ghost" @click="$emit('toggle-theme')">
        Toggle Theme
      </button>

      <button
          v-if="!auth.isLoggedIn"
          class="btn btn-ghost"
          @click="goLogin"
      >
        Login
      </button>

      <button
          v-else
          class="btn btn-ghost"
          @click="doLogout"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '../stores/useAuthStore'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

export default defineComponent({
  emits: ['toggle-theme'],
  setup() {
    const auth = useAuthStore()
    const router = useRouter()
    const { logout } = useAuth()

    function goLogin() {
      router.push({ name: 'Login' })
    }

    async function doLogout() {
      await logout()
      router.push({ name: 'Feed' })
    }

    return { auth, goLogin, doLogout }
  }
})
</script>