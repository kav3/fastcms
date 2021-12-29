<template>
    <div>
        <div class="flex items-center justify-between gap-2 my-2">
            <span>
                <router-link
                    class="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-2 rounded"
                    to="/posts/new"
                >add new post</router-link>
            </span>
            <h1 class="text-4xl text-gray-300" v-text="total"></h1>
        </div>
        <ul>
            <li class="flex flex-col bg-gray-100 rounded">
                <router-link
                    v-for="post, index in posts"
                    :key="index"
                    :to="`/posts/${post._id}`"
                    class="hover:bg-gray-200 p-2 cursor-pointer"
                >
                    <span v-text="post.title"></span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import usePosts from '@/composables/usePosts';
const { posts, total, get } = usePosts();
get();

</script>