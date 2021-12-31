<template>
    <nav class="flex items-center justify-between gap-2 text-lg text-gray-700 dark:text-gray-300">
        <span class="flex items-center justify-between gap-4">
            <Nuxt-Link class="py-3" to="/">{{ locales.fastcms }}</Nuxt-Link>
            <slot></slot>
        </span>
        <span class="flex items-center justify-between gap-4">
            <Dark />
        </span>
    </nav>
</template>

<script lang="ts" setup>
import locales from "~/locales/fa.json"
</script>