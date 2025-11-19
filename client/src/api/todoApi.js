import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'
});

export const fetchTodos = () => API.get('/todos').then(r => r.data);
export const createTodo = (payload) => API.post('/todos', payload).then(r => r.data);
export const updateTodo = (id, payload) => API.put(`/todos/${id}`, payload).then(r => r.data);
export const toggleDone = (id) => API.patch(`/todos/${id}/done`).then(r => r.data);
export const deleteTodo = (id) => API.delete(`/todos/${id}`).then(r => r.data);
