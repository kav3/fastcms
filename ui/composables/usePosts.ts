
export default function usePosts(api = "/posts") {
    const config = useRuntimeConfig()

    const get = async (page = 1, limit = 15) => await useFetch(api, { baseURL: config.BASE_URL, params: { page: page, limit: limit } });

    const getByUrl = async (url = "404") => await useFetch(`${api}/url/${url}`, { baseURL: config.BASE_URL });

    return { get, getByUrl }
}