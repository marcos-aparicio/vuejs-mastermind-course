const API_BASE_URL = "/api";

const api = {
  async addTodo(todo) {
    const req = await fetch(`${API_BASE_URL}/todos`, {
      method: "POST",
      body: JSON.stringify({ ...todo, completed: false }),
    });
    const newTodo = await req.json();
    return newTodo;
  },
  async deleteTodo(id) {
    const req = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });
    const newTodo = await req.json();
    return newTodo;
  },
  async updateTodo(id, todo) {
    const req = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
    });
    const newTodo = await req.json();
    return newTodo;
  },
  async getTodos() {
    const req = await fetch(`${API_BASE_URL}/todos`);
    const todos = await req.json();
    return todos;
  },
};
export { api };
