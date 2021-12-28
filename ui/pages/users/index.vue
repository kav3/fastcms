<template>
    <div class="flex flex-col text-lg">
        <nuxt-link :to="`/users/${user}`" v-for="user in data.payload.users" class="bg-white hover:bg-blue-100 rounded my-2 p-3">
            {{user}}
        </nuxt-link>
    </div>
</template>

<script lang="ts" setup>
const { data } = await useFetch("/api/users");

</script>