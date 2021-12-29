<template>
    <div class="flex flex-col">
        <label class="text-sm font-semibold">{{ props.value?.name }}</label>
        <input
            v-if="props.value?.type === FieldType.TEXT || props.value?.type === FieldType.PASSWORD"
            :type="FieldType[props.value?.type].toLowerCase()"
            :dir="Direction[props.value?.dir].toLowerCase()"
            class="appearance-none block w-full bg-gray-200 border rounded py-2 px-4 focus:outline-none focus:bg-white text-lg dark:bg-gray-800 dark:border-gray-700"
            :class="props.value?.errors.some(x => x) && 'border-red-500 dark:border-red-500'"
            v-model="v"
        />
        <ul class="text-sm text-red-600">
            <li v-for="err, index in props.value?.errors" :key="index" v-text="err"></li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed, PropType } from "vue"
import { FieldType, Direction, Field } from "@/composables/useForm";

const props = defineProps({
    value: {
        type: Object as PropType<Field>,
    },
})

const emit = defineEmits(['update']);

const v = computed({
    get() {
        return props.value?.value;
    },
    set(val: string | number | boolean | string[]) {
        emit('update', val);
    }
})

</script>