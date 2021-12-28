<template>
    <button
        class="hover:bg-gray-200 dark:hover:bg-gray-700 w-8 h-8 rounded-full cursor-pointer outline-none"
        @click="toggle"
    >
        <IconMoon v-if="dark" class="m-auto" />
        <IconSun v-else class="m-auto" />
    </button>
</template>
<script lang="ts">
export default {
    setup() {
        const dark = useCookie<boolean>('dark')
        dark.value = dark.value || false;

        watch(dark, value => {
            useMeta({
                htmlAttrs: {
                    lang: 'fa',
                    class: dark.value ? 'dark' : ''
                }
            })
        }, { immediate: true })

        const toggle = () => dark.value = !dark.value;

        return { dark, toggle }
    },
}

</script>