import React from 'react';
import { List, Typography } from '@mui/material';
import TodoItem from './TodoItem';

export default function TodoList({ todos, loading, onToggle, onDelete, onEdit }) {
  if (loading) return <Typography>Loading...</Typography>;
  if (!todos || todos.length === 0) return <Typography>No todos yet</Typography>;

  return (
    <List>
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={() => onToggle(todo._id)}
          onDelete={() => onDelete(todo._id)}
          onEdit={(patch) => onEdit(todo._id, patch)}
        />
      ))}
    </List>
  );
}
