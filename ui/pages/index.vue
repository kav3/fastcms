<template>
    <div class="flex">
        <nuxt-link :to="post.url" v-for="post in data.items" class="bg-white dark:bg-gray-800 rounded p-4 w-full">
            <h2>{{ post.title }}</h2>
        </nuxt-link>
    </div>
</template>
<script lang="ts" setup>
const { get } = usePosts();
const { data } = await get();
</script>