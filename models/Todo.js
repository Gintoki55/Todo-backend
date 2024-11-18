const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the To-Do schema
const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate task titles
        trim: true    // Removes leading and trailing whitespace
    },
    completed: {
        type: Boolean,
        default: false // Default status is incomplete
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the creation timestamp
    }
});

// Create the model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
