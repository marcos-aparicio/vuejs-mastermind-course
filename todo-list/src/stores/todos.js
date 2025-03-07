import { reactive } from "vue";
export const store = reactive({
  todoTitle: "",
  lastIndex: 0,
  todos: [],

  removeTodo(index) {
    this.todos = this.todos.filter((todo) => todo.index !== index);
  },
  addTodo() {
    if (this.todoTitle === "") {
      // this.showAlert = true;
      return;
    }

    this.todos.push({
      title: this.todoTitle,
      index: this.lastIndex++,
    });
  },
});
