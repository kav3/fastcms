<template>
  <div>
    <form v-if="!state.token" @submit.prevent="submit">
      <div v-if="status == 0">
        <label>username</label>
        <input
          type="text"
          v-model="form.username"
          class="appearance-none block w-full bg-gray-200 border rounded py-2 px-4 focus:outline-none focus:bg-white text-lg dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div v-if="status == 2">
        <label>name</label>
        <input
          type="text"
          dir="rtl"
          v-model="form.name"
          class="appearance-none block w-full bg-gray-200 border rounded py-2 px-4 focus:outline-none focus:bg-white text-lg dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div v-if="status != 0">
        <label>password</label>
        <input
          type="password"
          v-model="form.password"
          class="appearance-none block w-full bg-gray-200 border rounded py-2 px-4 focus:outline-none focus:bg-white text-lg dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      <div class="flex items-center gap-2 justify-between pt-2">
        <span>&nbsp;</span>

        <span class="flex items-center gap-2">
          <button class="p-3" type="button" @click="status = 0">back</button>
          <button class="bg-green-500 text-white font-semibold p-3 rounded" type="submit">submit</button>
        </span>
      </div>
    </form>
    <div v-else class="p-4">
      you are logged in
      <strong class="font-semibold">{{ state.username }}</strong>
      .
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import apiURL from "../utils/env"
import { useGlobalState } from '../composables/useGlobalState'
const state = useGlobalState()

const form = reactive({
  username: "",
  password: "",
  name: ""
})

const status = ref(0);

watch(status, value => {
  if (value == 0) {
    state.value.token = '';
    form.password = "";
  }
})

const submit = async () => {
  const res = await fetch(`${apiURL}/users/auth`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });

  if (res.status == 200) {
    const obj = await res.json()
    if (status.value == 0) {
      status.value = obj.exist ? 1 : 2;
    } else {
      state.value.username = obj.username;
      state.value.token = obj.token;
    }
  }
};

</script>
