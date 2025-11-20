<template>
  <div class="post-card rounded-2xl shadow-2xl p-6 bg-[#0f1114] text-gray-200">
    <div class="flex items-start gap-6">
      <div class="flex-1">
        <h2 class="text-4xl md:text-5xl font-extrabold leading-tight">{{ post.title }}</h2>
        <div class="border-b border-gray-600 my-4"></div>
        <p class="text-lg md:text-xl text-gray-300">{{ post.content }}</p>
      </div>

      <div class="w-48 shrink-0 flex flex-col items-end">
        <div class="flex items-center gap-3">
          <div class="text-right">
            <div class="text-3xl font-bold text-indigo-300">{{ author.name }}</div>
          </div>
          <img
              :src="author.avatar"
              alt="avatar"
              class="w-16 h-16 rounded-full border-2 border-gray-700 cursor-pointer"
              @click="goToAuthor"
          />
        </div>

        <span
            :class="badgeClass"
            class="mt-3 inline-block px-3 py-1 text-sm font-medium rounded-full select-none"
        >
          {{ post.type }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType } from "vue";
import { useRouter } from "vue-router";
import { TYPE_COLOR } from "../data/constants";
import type { Post, Author } from "../stores/useDataStore";

export default defineComponent({
  props: {
    post: { type: Object as PropType<Post>, required: true },
    author: { type: Object as PropType<Author>, required: true },
  },
  setup(props) {
    const router = useRouter();

    function goToAuthor() {
      router.push({ name: "AuthorProfile", params: { id: props.author.id } });
    }

    const badgeClass = computed(() => {
      const base = "text-white";
      const color = TYPE_COLOR[props.post.type] || "bg-indigo-600";
      if (color.startsWith("badge-")) {
        return `${base} bg-indigo-600`;
      }
      return `${base} ${color}`;
    });

    return { goToAuthor, badgeClass };
  },
});
</script>

<style scoped>
.post-card {
  border-radius: 1.25rem;
}
</style>