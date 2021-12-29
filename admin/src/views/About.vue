<template>
    <div>
        <p class="py-10">Posts</p>
        <ul>
            <li v-for="post, index in posts" :key="index" class="py-2 hover:bg-gray-200">
                <span v-text="post.title"></span>
            </li>
        </ul>
        total: 
        {{ total }}
    </div>
</template>

<script lang="ts" setup>
import usePosts from '@/composables/usePosts';
const { posts, total } = usePosts();

</script>