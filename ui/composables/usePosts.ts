
export default function usePosts(api = "/posts") {
    const config = useRuntimeConfig()
    const posts = ref([])
    const total = ref(1);

    const get = async (page = 1, limit = 15) => {
        const { data } = await useFetch(api, { baseURL: config.BASE_URL, params: { page: page, limit: limit } });
        posts.value = data.value.items;
        total.value = data.value.pageInfo.total;
    }

    const getByUrl = async (url = "404") => await useFetch(`${api}/url/${url}`, { baseURL: config.BASE_URL });

    return { get, posts, total, getByUrl }
}