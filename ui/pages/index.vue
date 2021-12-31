<template>
    <div>
        <div class="masonry-3-col box-border mx-auto before:box-inherit after:box-inherit">
            <div
                v-for="post in posts"
                class="bg-white hover:shadow-lg dark:bg-gray-800 rounded break-inside mb-4"
            >
                <nuxt-link :to="post.url" class="flex flex-col">
                    <img
                        v-if="post.images&&post.images.length>0"
                        class="w-full rounded-t h-28 object-cover"
                        alt="data.title"
                        :src="post.images[0]"
                    />
                    <h2 class="p-4">{{ post.title }}</h2>
                </nuxt-link>
            </div>
        </div>
        <div class="flex items-center gap-2 justify-between py-2">
            <span>&nbsp;</span>
            <!-- <span v-text="total"></span> -->
            <!-- <span>page: {{ page }}</span> -->
            <span>
                <Pager :limit="limit" v-model="page" :total="total" />
            </span>
        </div>
    </div>
</template>
<script lang="ts" setup>
const { get, posts, total } = usePosts();
const page = ref(1);
const limit = ref(30);
watch(page, async value => {
    await get(value, limit.value);
})

await get(page.value, limit.value);

</script>
