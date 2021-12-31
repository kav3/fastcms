<template>
    <nav class="flex items-center gap-2 justify-between">
        <router-link to="/">Home</router-link>
        <div v-if="state.token" class="flex items-center gap-2">
            <router-link to="/posts">Posts</router-link>
            <button
                @click="state.token = ''"
                class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            >logout</button>
        </div>
    </nav>
</template>

<script lang="ts" setup>
import { useGlobalState } from '../composables/useGlobalState'
const state = useGlobalState()

</script>