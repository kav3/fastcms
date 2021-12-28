<template>
    <footer class="flex gap-1 items-center text-xs">
        {{locales.footer.copyright_1}}
        <IconHeart />
        {{locales.footer.copyright_2}}
        <a class='border-b border-gray-400 hover:border-blue-500' 
        href='https://ikaveh.com' target='_blank'>{{locales.kaveh}}</a>
    </footer>
</template>

<script lang="ts" setup>
import locales from "../locales/fa.json"
</script>