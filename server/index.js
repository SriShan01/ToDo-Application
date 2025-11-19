require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todosRouter = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/todos', todosRouter);

app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === 'ValidationError' || err.name === 'YupValidationError') {
    return res.status(400).json({ error: err.message || 'Validation failed' });
  }
  res.status(500).json({ error: 'Server error' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Mongo connection error:', err);
  });
