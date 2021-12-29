<template>
  <div>
    <div class="bg-gray-200 dark:bg-black fixed w-full">
      <Nav class="max-w-5xl px-2 mx-auto">
        <div v-if="store.state.token" class="flex items-center gap-2">
          <Nuxt-Link class="py-3" to="/posts">{{ locales.admin.posts }}</Nuxt-Link>
          <Nuxt-Link class="py-3" to="/users">{{ locales.admin.users }}</Nuxt-Link>
        </div>
      </Nav>
    </div>
    <div class="max-w-5xl px-2 mx-auto dark:text-gray-200">
      <div class="min-h-screen flex flex-col">
        <NuxtPage class="m-auto w-full" />
        <div class="flex items-center justify-between gap-2 pb-4 text-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import locales from "~/locales/fa.json"
useMeta({ title: locales.fastcms })

const store = useStore()
const token = useCookie('token')

watch(store.state, value => {
  token.value = store.state.token;
})

if (token.value != store.state.token)
  store.methods.setToken(token.value)

</script>

<style>
@font-face {
  font-family: Samim;
  src: url("@/assets/fonts/Samim.eot");
  src: url("@/assets/fonts/Samim.eot?#iefix") format("embedded-opentype"),
    url("@/assets/fonts/Samim.woff2") format("woff2"),
    url("@/assets/fonts/Samim.woff") format("woff"),
    url("@/assets/fonts/Samim.ttf") format("truetype");
  font-weight: normal;
}

html[lang="fa"] {
  font-family: Samim;
  direction: rtl;
}

body {
  background: rgba(243, 244, 246, 1);
}

html.dark body {
  background: rgb(20, 20, 20);
}

.ltr {
  direction: ltr;
}

.masonry-3-col {
  column-count: 3;
  column-gap: 1em;
}
.masonry-2-col {
  column-count: 2;
  column-gap: 1em;
}
.break-inside {
  break-inside: avoid;
}
</style>