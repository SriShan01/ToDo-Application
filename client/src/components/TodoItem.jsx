import React, { useState } from 'react';
import { ListItem, Checkbox, IconButton, TextField, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: todo.title, description: todo.description || '' });

  const startEdit = () => setEditing(true);
  const cancel = () => {
    setForm({ title: todo.title, description: todo.description || '' });
    setEditing(false);
  };

  const save = async () => {
    if (!form.title || form.title.trim().length === 0) {
      toast.error('Title required');
      return;
    }
    await onEdit(form);
    setEditing(false);
  };

  return (
    <ListItem
      divider
      secondaryAction={
        <>
          {editing ? (
            <>
              <IconButton edge="end" onClick={save}><SaveIcon /></IconButton>
              <IconButton edge="end" onClick={cancel}><CancelIcon /></IconButton>
            </>
          ) : (
            <>
              <IconButton edge="end" onClick={startEdit}><EditIcon /></IconButton>
              <IconButton edge="end" onClick={onDelete}><DeleteIcon /></IconButton>
            </>
          )}
        </>
      }
    >
      <Checkbox checked={!!todo.done} onChange={onToggle} />
      <Box className="flex-1">
        {editing ? (
          <>
            <TextField fullWidth value={form.title} size="small" onChange={(e) => setForm(s => ({ ...s, title: e.target.value }))} />
            <TextField fullWidth value={form.description} size="small" multiline rows={2} onChange={(e) => setForm(s => ({ ...s, description: e.target.value }))} className="mt-2" />
          </>
        ) : (
          <>
            <Typography style={{ textDecoration: todo.done ? 'line-through' : 'none', opacity: todo.done ? 0.6 : 1 }} variant="subtitle1">{todo.title}</Typography>
            {todo.description ? <Typography variant="body2" style={{ opacity: todo.done ? 0.6 : 0.9 }}>{todo.description}</Typography> : null}
          </>
        )}
      </Box>
    </ListItem>
  );
}
