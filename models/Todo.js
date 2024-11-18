const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the To-Do schema
const todoSchema = new Schema({
    title: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

// Create the model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
