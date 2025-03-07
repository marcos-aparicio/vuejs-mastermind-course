import { reactive } from "vue";
export const store = reactive({
  todoTitle: "",
  todos: [],

  removeTodo(index) {
    this.todos = this.todos.filter((todo) => todo.index !== index);
  },
});
