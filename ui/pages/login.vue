<template>
    <div class="flex flex-col w-6/12">
        <div class="bg-white dark:bg-gray-900 rounded-lg p-4 shadow">
            <form v-if="!store.state.token" @submit.prevent="submit">
                <div v-for="(field, propertyName) in form">
                    <DynamicInput class="py-1" v-model="field.value" />
                </div>
                <div class="flex items-center-gap-2 justify-between pt-3">
                    <span>&nbsp;</span>
                    <button
                        type="submit"
                        class="bg-green-500 hover:bg-green-600 text-gray-100 hover:text-white px-3 py-2 rounded font-bold"
                        :class="!isValid && 'bg-gray-400 text-gray-700 hover:bg-gray-400'"
                        :disabled="!isValid"
                    >submit</button>
                </div>
            </form>
            <div v-else>you are logged in.</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { form, submit, isValid } = useLogin()
const store = useStore()

watch(store.state, value => {
    if (store.state.token)
        useRouter().push('/admin')
}, { immediate: true })

</script>