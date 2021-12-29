<template>
    <form @submit.prevent="submit">
        <label>Title</label>
        <input
            type="text"
            v-model="post.title"
            dir="rtl"
            class="appearance-none block w-full bg-gray-200 border rounded py-2 px-4 focus:outline-none focus:bg-white text-lg dark:bg-gray-800 dark:border-gray-700"
        />
        <label>url</label>
        <input
            type="text"
            v-model="post.url"
            class="appearance-none block w-full bg-gray-200 border rounded py-2 px-4 focus:outline-none focus:bg-white text-lg dark:bg-gray-800 dark:border-gray-700"
        />
        <label>body</label>
        <ckeditor :editor="editor" v-model="post.body"></ckeditor>

        <div class="flex items-center gap-2 justify-between pt-2">
            <span>&nbsp;</span>
            <button class="bg-green-500 text-white font-semibold p-3 rounded" type="submit">submit</button>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import usePosts from '@/composables/usePosts';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRoute } from 'vue-router';

export default defineComponent({
    setup() {
        const { post, getById, createOrUpdate } = usePosts();

        const route = useRoute()
        getById(route.params.id as string);

        const submit = () => createOrUpdate();

        return { post, submit }
    },
    data() {
        return {
            editor: ClassicEditor
        }
    }
})

</script>