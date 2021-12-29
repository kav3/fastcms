export default async function useFetch(api: string, page = 1, limit = 15) {
    const res = await fetch(`${process.env.VUE_APP_API}${api}?page=${page}&limit=${limit}`);
    const json = await res.json();
    const items = json.items;
    const total = json.pageInfo.total;
    
    return { items, total }
}