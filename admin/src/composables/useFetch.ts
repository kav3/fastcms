import apiURL from "../utils/env"
export default async function useFetch(api: string, page = 1, limit = 15) {
    const res = await fetch(`${apiURL}${api}?page=${page}&limit=${limit}`);
    const json = await res.json();
    const items = json.items;
    const total = json.pageInfo.total;
    
    return { items, total }
}