<template>
  <div class="max-w-md mx-auto space-y-4">
    <h2 class="text-xl font-bold">Login</h2>
    <input v-model="username" placeholder="Username" class="input input-bordered w-full" />
    <input v-model="password" type="password" placeholder="Password" class="input input-bordered w-full" />
    <div class="flex gap-2">
      <button class="btn btn-primary" @click="submit" :disabled="isLoading">Login</button>
      <router-link to="/" class="btn">Cancel</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

export default defineComponent({ setup() {
    const username = ref('admin')
    const password = ref('pass')
    const { login, isLoading } = useAuth()
    const router = useRouter()

    async function submit() {
      try {
        await login({ username: username.value, password: password.value })
        router.push({ name: 'Admin' })
      } catch (e) {
      }
    }

    return { username, password, submit, isLoading }
  } })
</script>