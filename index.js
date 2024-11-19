const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/Todo'); // Path to your Todo model
const cors = require('cors');
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb+srv://davidmohmed:99149747Amm@mytodoproject.tigg4.mongodb.net/?retryWrites=true&w=majority&appName=myTodoProject')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection failed', err));



/// test 

app.get('/', (req, res) => {
    res.send('Hello, World!!!');
})

app.get('/welcome', (req, res) => {
    res.send('Welcome to the To-Do API!')
})

// Get all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find(); // Fetch all todos
        res.status(200).json(todos);    // Return the todos in JSON format
    } catch (error) {
        console.error("Error fetching todos:", error.message);
        res.status(500).json({ error: "An error occurred while fetching todos." });
    }
});


// Add a new todo
app.post('/todos', async (req, res) => {
    try {
        const newTodo = new Todo({
            title: req.body.title,
            completed: req.body.completed
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
