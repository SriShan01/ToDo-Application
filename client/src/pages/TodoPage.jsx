import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import * as api from '../api/todoApi';
import { toast } from 'react-toastify';

export default function TodoPage(){
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.fetchTodos();
      setTodos(data);
    } catch (err) {
      toast.error('Failed to load todos');
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const add = async (payload) => {
    const temp = { ...payload, _id: `temp-${Date.now()}`, createdAt: new Date().toISOString(), done: false, description: payload.description || '' };
    setTodos(prev => [temp, ...prev]);
    try {
      const saved = await api.createTodo(payload);
      setTodos(prev => prev.map(t => t._id === temp._id ? saved : t));
      toast.success('Todo added');
    } catch (err) {
      setTodos(prev => prev.filter(t => t._id !== temp._id));
      toast.error('Failed to add todo');
    }
  };

  const edit = async (id, patch) => {
    const prev = todos;
    setTodos(prevTodos => prevTodos.map(t => t._id === id ? { ...t, ...patch } : t));
    try {
      const updated = await api.updateTodo(id, patch);
      setTodos(prev => prev.map(t => t._id === id ? updated : t));
      toast.success('Updated');
    } catch (err) {
      setTodos(prev => prev.map(t => prev.find(p=>p._id === t._id) || t));
      toast.error('Update failed');
      load();
    }
  };

  const toggle = async (id) => {
    setTodos(prev => prev.map(t => t._id === id ? { ...t, done: !t.done } : t));
    try {
      await api.toggleDone(id);
      if (todos.find(t => t._id === id).done) toast.warning('Removed from marked as Done');
      else toast.warning('Marked as Done');
    } catch (err) {
      toast.error('Toggle failed');
      load();
    }
  };

  const remove = async (id) => {
    const old = todos;
    setTodos(prev => prev.filter(t => t._id !== id));
    try {
      await api.deleteTodo(id);
      toast.success('Deleted');
    } catch (err) {
      toast.error('Delete failed');
      setTodos(old);
    }
  };

  return (
    <Container maxWidth="md" className="py-8">
      <Paper elevation={3} className="p-6">
        <Typography variant="h4" component="h1" gutterBottom>
          Fullstack TODO
        </Typography>

        <TodoForm onSubmit={add} />

        <Box mt={4}>
          <TodoList
            todos={todos}
            loading={loading}
            onToggle={toggle}
            onDelete={remove}
            onEdit={edit}
          />
        </Box>
      </Paper>
    </Container>
  );
}
