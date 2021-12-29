<template>
  <div class="min-h-screen flex flex-col justify-between">
    <div class="bg-gray-100 py-2">
      <div class="w-5/6 px-2 m-auto">
        <Nav />
      </div>
    </div>
    <div class="w-5/6 px-2 m-auto">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Nav from "@/components/Nav.vue"
</script>
