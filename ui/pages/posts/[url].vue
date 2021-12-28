<template>
    <div>
        <h2>{{ route.params.url }}</h2>
        <!-- <vue-editor /> -->
        <input type="file" @input="upload" />
    </div>
</template>
<script lang="ts" setup>
const route = useRoute()
const upload = (event) => {
    for (let index = 0; index < event.target.files.length; index++) {
        const file = event.target.files[index];
        const fd = new FormData();
        fd.append("file", file);
        useFetch('/api/upload', {
            method: "POST", body: fd
        })
    }
}
</script>