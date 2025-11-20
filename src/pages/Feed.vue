<template>
  <div class="min-h-screen bg-[#0b0c0e] text-gray-200 py-8">
    <div class="container mx-auto px-4 md:px-6">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl md:text-4xl font-extrabold">Feed</h1>
        <div class="flex items-center gap-3">
          <select v-model="filter" class="select select-bordered bg-[#0f1114] text-gray-200">
            <option value="All">All</option>
            <option v-for="t in types" :key="t">{{ t }}</option>
          </select>
        </div>
      </div>

      <div class="space-y-8">
        <PostCard
            v-for="p in filteredPosts"
            :key="p.id"
            :post="p"
            :author="authorFor(p.authorId)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useDataStore, type Post, type Author } from "../stores/useDataStore";
import PostCard from "../components/PostCard.vue";
import { POST_TYPES } from "../data/constants";

export default defineComponent({
  components: { PostCard },
  setup() {
    const store = useDataStore();
    const filter = ref<string>("All");
    const types = POST_TYPES;

    const filteredPosts = computed(() => {
      if (filter.value === "All") return store.posts;
      return store.posts.filter((p) => p.type === filter.value);
    });

    function authorFor(id: string): Author {
      return (
          store.getAuthorById(id) || { name: "Unknown", avatar: "/avatars/avatar1.png", id }
      );
    }

    return { filter, types, filteredPosts, authorFor };
  },
});
</script>

<style scoped>
</style>