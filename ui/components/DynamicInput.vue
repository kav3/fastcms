<template>
    <div class="flex flex-col">
        <label class="text-sm font-semibold">{{ props.modelValue.name }}</label>
        <input
            v-if="props.modelValue.type === FieldType.TEXT || props.modelValue.type === FieldType.PASSWORD"
            :type="FieldType[props.modelValue.type].toLowerCase()"
            :dir="Direction[props.modelValue.dir].toLowerCase()"
            class="appearance-none block w-full bg-gray-200 border rounded py-2 px-4 focus:outline-none focus:bg-white text-lg dark:bg-gray-800 dark:border-gray-700"
            :class="props.modelValue.errors.some(x=>x)&&'border-red-500 dark:border-red-500'"
            v-model="v"
        />
        <ul class="text-sm text-red-600">
            <li v-for="err in props.modelValue.errors" v-text="err"></li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { Field, FieldType } from "../composables/useField"
import { Direction } from "../common/enums"
const props = defineProps({
    modelValue: {
        type: Object,
    },
})

const emit = defineEmits(['update:modelValue']);

const v = computed({
    get() {
        return props.modelValue.value
    },
    set(val) {
        props.modelValue.value = val;
        emit('update:modelValue', props.modelValue);
    }
})
</script>