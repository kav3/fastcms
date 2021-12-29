import { ref } from "vue";
import useFetch from "./useFetch";
export default function usePosts(api = "/posts") {
    const posts = ref([{ title: "no post" }])
    const total = ref(0)
    const post = ref({})

    const get = async (page = 1, limit = 15) => {
        const { items, total: t } = await useFetch(api)
        posts.value = items;
        total.value = t;
    }

    const getById = async (id = "new") => {
        const res = await fetch(`${process.env.VUE_APP_API}${api}/id/${id}`);
        const json = await res.json();
        post.value = json;
    }

    return { posts, total, get, post, getById }
}