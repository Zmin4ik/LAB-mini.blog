<template>
  <div class="card w-full bg-base-100 shadow-md">
    <div class="card-body">
      <div class="flex items-center gap-4">
        <img :src="author.avatar" class="w-12 h-12 rounded-full cursor-pointer" @click="goToAuthor" />
        <div>
          <h3 class="font-bold cursor-pointer" @click="goToAuthor">{{ author.name }}</h3>
          <div class="text-sm opacity-70">{{ post.title }}</div>
        </div>
        <div class="ml-auto">
          <span :class="['badge', typeColor]">{{ post.type }}</span>
        </div>
      </div>
      <p class="mt-2">{{ post.content }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType } from 'vue'
import { useRouter } from 'vue-router'
import { TYPE_COLOR } from '../data/constants'
import type { Post, Author } from '../stores/useDataStore'

export default defineComponent({
  props: {
    post: { type: Object as PropType<Post>, required: true },
    author: { type: Object as PropType<Author>, required: true }
  },
  setup(props) {
    const router = useRouter()
    const typeColor = computed(() => TYPE_COLOR[props.post.type] || 'badge-primary')

    function goToAuthor() {
      router.push({ name: 'AuthorProfile', params: { id: props.author.id } })
    }

    return { typeColor, goToAuthor }
  }
})
</script>