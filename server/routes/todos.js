const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const yup = require('yup');

const createSchema = yup.object({
  title: yup.string().required().min(1, 'Title is required'),
  description: yup.string().optional()
});

const updateSchema = yup.object({
  title: yup.string().optional(),
  description: yup.string().optional()
});

const validate = (schema) => async (req, res, next) => {
  try {
    req.validatedBody = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    next();
  } catch (err) {
    err.name = 'YupValidationError';
    next(err);
  }
};

router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) { next(err); }
});

router.post('/', validate(createSchema), async (req, res, next) => {
  try {
    const { title, description } = req.validatedBody;
    const todo = new Todo({ title, description });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) { next(err); }
});

router.put('/:id', validate(updateSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.validatedBody;
    const todo = await Todo.findByIdAndUpdate(id, updates, { new: true });
    if (!todo) return res.status(404).json({ error: 'Not Found' });
    res.json(todo);
  } catch (err) { next(err); }
});

router.patch('/:id/done', async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ error: 'Not Found' });
    todo.done = !todo.done;
    await todo.save();
    res.json(todo);
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ error: 'Not Found' });
    res.json({ message: 'Deleted', id: todo._id });
  } catch (err) { next(err); }
});

module.exports = router;
