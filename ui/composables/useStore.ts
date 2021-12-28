const state = reactive({
    token: ''
})

const methods = {
    setToken(val: string) {
        state.token = val;
    }
}

export default function useStore() {
    return { state, methods }
}