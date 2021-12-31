<template>
    <article itemscope itemtype="https://schema.org/Article">
        <img
            class="w-full rounded my-2 h-72 object-cover"
            alt="data.title"
            :src="data.images[0]"
        />
        <h1 itemprop="name" class="text-4xl font-bold" v-text="data.title"></h1>
        <div class="flex items-center justify-between gap-2 text-sm">
            <time itemprop="datePublished" :datetime="data.publishedAt" v-text="j(data.publishedAt)"></time>
            <span v-if="data.user[0]" itemprop="author" v-text="data.user[0]"></span>
        </div>
        <div class="bg-white dark:bg-gray-800 my-2 rounded p-4" v-html="data.body"></div>
    </article>
</template>
<script lang="ts" setup>
import moment from 'moment-jalaali'
moment.loadPersian({dialect: 'persian-modern'})
const route = useRoute()
const { getByUrl } = usePosts();
const { data } = await getByUrl(route.params.url.toString())
useMeta({ title: data.value.title, meta: [{ name: "description", content: data.value.meta.description }] })
const j = (d) => moment(d).format('jDD jMMMM jYYYY');
</script>