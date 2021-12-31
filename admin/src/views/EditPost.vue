<template>
    <form @submit.prevent="submit">
        <div>
            <label>
                <input type="checkbox" v-model="publish" />
                Publish
            </label>
        </div>

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
        <label>images</label>
        <ul>
            <li v-for="img, index in post.images" :key="index" class="flex items-center gap-1">
                <img :src="img" class="h-14" />
            </li>
        </ul>
        <label>body</label>
        <ckeditor :editor="editor" :config="editorConfig" v-model="post.body"></ckeditor>

        <div class="flex items-center gap-2 justify-between pt-2">
            <span>&nbsp;</span>
            <button class="bg-green-500 text-white font-semibold p-3 rounded" type="submit">submit</button>
        </div>
    </form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import usePosts from '@/composables/usePosts';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';

import { useRoute } from 'vue-router';
import UploadAdapter from "../utils/uploadAdapter"

export default defineComponent({
    setup() {
        const { post, getById, createOrUpdate } = usePosts();

        const publish = computed({
            get() {
                return !!post.value["publishedAt"];
            },
            set(v) {
                if(v)
                    post.value["publishedAt"] = true;
                else
                    post.value["publishedAt"] = null;
            }
        })

        const route = useRoute()
        getById(route.params.id as string);

        const submit = () => createOrUpdate();

        const uploader = (editor) => {
            const fileRepository = editor.plugins.get("FileRepository");

            fileRepository.createUploadAdapter = (loader) => {

                loader.on("change:uploadResponse", (eventInfo, name, value, oldValue) => {
                    let a = eventInfo + name + oldValue;
                    if (a) {
                        a += "a"
                    }

                    if (value)
                        post.value["images"].push(value.default);
                })

                return new UploadAdapter(loader);
            };
        }

        const editorConfig = reactive({
            language: {
                content: "fa",
            },
            allowedContent: true,
            extraPlugins: [uploader, "MediaEmbed"],
            link: {
                addTargetToExternalLinks: true,
            },
            heading: {
                options: [
                    {
                        model: "paragraph",
                        title: "Paragraph",
                        class: "ck-heading_paragraph",
                    },
                    {
                        model: "heading2",
                        view: "h2",
                        title: "Heading 2",
                        class: "text-2xl",
                    },
                    {
                        model: "heading3",
                        view: "h3",
                        title: "Heading 3",
                        class: "text-xl",
                    },
                    {
                        model: "heading4",
                        view: "h4",
                        title: "Heading 4",
                        class: "text-md",
                    },
                    {
                        model: "heading5",
                        view: "h5",
                        title: "Heading 5",
                        class: "text-sm",
                    },
                    {
                        model: "heading6",
                        view: "h6",
                        title: "Heading 6",
                        class: "text-xs",
                    },
                ],
            },
        })

        return { post, publish, submit, editorConfig }
    },
    data() {
        return {
            editor: ClassicEditor,
        }
    },

})

</script>