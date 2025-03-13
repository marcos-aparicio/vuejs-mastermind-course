const URL = "/api";
const api = {
  async addTodo(todo) {
    const req = await fetch(`${URL}/todos`, {
      method: "POST",
      body: JSON.stringify(todo),
    });
    const newTodo = await req.json();
    return newTodo;
  },
  async deleteTodo(index) {
    const req = await fetch(`${URL}/todos/${index}`, {
      method: "DELETE",
    });
    const newTodo = await req.json();
    return newTodo;
  },
  async updateTodo(todo) {
    const index = todo.index;
    const transformedTodo = { title: todo.title };
    const req = await fetch(`${URL}/todos/${index}`, {
      method: "PUT",
      body: JSON.stringify(transformedTodo),
    });
    const newTodo = await req.json();
    return newTodo;
  },
  async getTodos() {
    const req = await fetch(`${URL}/todos`);
    const todos = await req.json();
    return todos;
  },
};
export { api };
