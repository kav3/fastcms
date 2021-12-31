import apiURL from "../utils/env"
import { useGlobalState } from '../composables/useGlobalState'

export default async function useFetch(api: string, page = 1, limit = 15) {
    const state = useGlobalState()

    const res = await fetch(`${apiURL}${api}?page=${page}&limit=${limit}`, { headers: { authorization: 'Bearer ' + state["value"].token } });
    const json = await res.json();
    const items = json.items;
    const total = json.pageInfo.total;

    return { items, total }
}