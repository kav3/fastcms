<template>
    <slot />
</template>
<script lang="ts" setup>
useAuth()
const store = useStore()
watch(store.state, value => {
    if (!store.state.token)
        useRouter().push('/login')
})
</script>