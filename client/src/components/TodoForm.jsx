import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  title: yup.string().required('Title required').max(200),
  description: yup.string().max(1000)
}).required();

export default function TodoForm({ onSubmit }){
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const submit = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex gap-3 flex-col sm:flex-row items-start">
      <TextField
        label="Title"
        variant="outlined"
        size="small"
        error={!!errors.title}
        helperText={errors.title?.message}
        {...register('title')}
        className="flex-1"
      />
      <TextField
        label="Description"
        variant="outlined"
        size="small"
        {...register('description')}
        className="flex-1"
      />
      <Box>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Add
        </Button>
      </Box>
    </form>
  );
}
