<template>
    <div>
        <div class="flex items-center justify-between gap-2 my-2">
            <span>
                <button
                    class="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-2 rounded"
                    type="button"
                >add new post</button>
            </span>
            <h1 class="text-4xl text-gray-300" v-text="total"></h1>
        </div>
            <router-link
                v-for="post, index in posts"
                :key="index"
                :to="`/posts/${post._id}`"
                class="hover:bg-gray-200 p-2 cursor-pointer"
            >
                <span v-text="post.title"></span>
            </router-link>
    </div>
</template>

<script lang="ts" setup>
import usePosts from '@/composables/usePosts';
const { posts, total, get } = usePosts();
get();

</script>