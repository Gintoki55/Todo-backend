const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/Todo'); // Path to your Todo model

const app = express();
const port = 3000;
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://ahmedbarkhed:99149747amm@myfirstnodejscluster.y2gbr.mongodb.net/?retryWrites=true&w=majority&appName=myfirstNodeJSCluster')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection failed', err));

// Get all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new todo
app.post('/todos', async (req, res) => {
    try {
        const newTodo = new Todo({
            title: req.body.title
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted', deletedTodo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(port, () => console.log('Server running on http://localhost:3000'));
