<template>
  <div>
    <form @submit.prevent="submit">
      <DynamicInput v-for="f, index in form" :key="index" :value="f" @update="(val: any) => { f.value = val }" class="py-1" />
      <div class="flex items-center gap-2 justify-between pt-2">
        <span>&nbsp;</span>
        <button class="bg-green-500 text-white font-semibold p-3 rounded" type="submit">submit</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import DynamicInput from '@/components/DynamicInput.vue';
import useForm, { createField, FieldType } from '@/composables/useForm';

const username = createField("username");

const password = createField("password");
password.type = FieldType.PASSWORD;

const { form } = useForm([username, password]);

const submit = () => { console.log(form) };

</script>
