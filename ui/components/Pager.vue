<template>
    <ul class="flex items-center gap-1">
        <li v-for="n in pages" class="bg-white hover:bg-gray-200 rounded">
            <button
                type="button"
                v-text="n"
                @click="page = n"
                class="p-2"
                :class="page == n && 'font-bold'"
            ></button>
        </li>
    </ul>
</template>

<script lang="ts" setup>
const props = defineProps({
    modelValue: { type: Number },
    total: { type: Number },
    limit: { type: Number },
});

const emit = defineEmits(['update:modelValue']);

const page = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emit('update:modelValue', val);
    }
})

const pages = ref(parseInt(props.total / props.limit))
</script>