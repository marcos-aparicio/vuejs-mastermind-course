<template>
  <Alert :message="errorMessage" @close="errorMessage = ''" />
  <span class="loading loading-spinner loading-xl mx-auto text-primary" v-if="isLoading"></span>
  <div v-if="!isLoading" class="max-w-2xl flex flex-col gap-8 bg-base-200 p-4 px-16 rounded-xl self-center">
    <h3 class="text-2xl text-center font-bold">Edit Todo</h3>
    <div class="flex w-full flex-col">
      <label class="input w-full">
        <span class="label">Title: </span>
        <input type="text" placeholder="Your task" v-model="todo.title" />
      </label>
    </div>
    <div class="flex gap-2 justify-end">
      <Btn class="btn btn-info btn-sm" @click="submit" :disabled="isUpdatingTodo">
        <span class="loading loading-spinner loading-xl mx-auto text-primary" v-if="isUpdatingTodo"></span>
        <span v-else>Submit</span>

      </Btn>
    </div>

  </div>
</template>

<script setup>
import Alert from "@/components/Alert.vue";
import Btn from "@/components/Btn.vue";
import { api as todoApi } from "@/apis/todos";
import { useFetch } from "@/composables/fetch";
import { ref } from "vue";
import { useRouter } from "vue-router";


const isUpdatingTodo = ref(false);
const errorMessage = ref("");
const props = defineProps(["id"]);
const router = useRouter();

const { data: todo, _, isLoading } = useFetch(`/api/todos/${props.id}`, {
  onError: () => errorMessage.value = `Error fetching todo with id ${todo.value.id}`
});


async function submit() {
  if (todo.value.id === -1) {
    errorMessage.value = "not valid index";
    return;
  }
  else if (!todo.value.title) {
    errorMessage.value = "Not valid title since it is empty";
    return;
  }

  isUpdatingTodo.value = true;
  errorMessage.value = null;
  const updatedTodo = await todoApi.updateTodo({ index: todo.value.id, title: todo.value.title });
  if (!updatedTodo) {
    errorMessage.value = "Error trying to update value";
    return;
  }

  isUpdatingTodo.value = false;
  router.push("/");
};

</script>
