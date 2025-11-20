<template>
  <div class="navbar bg-base-200 rounded-box">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl">Microblog</a>
    </div>
    <div class="flex-none">
      <router-link to="/" class="btn btn-ghost">Feed</router-link>
      <router-link to="/authors/new" class="btn btn-ghost">New Author</router-link>
      <router-link to="/posts/new" class="btn btn-ghost">New Post</router-link>
      <button class="btn btn-ghost" @click="$emit('toggle-theme')">Toggle Theme</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({ emits: ['toggle-theme'] })
</script>