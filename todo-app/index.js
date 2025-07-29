const express = require('express');
const mongoose = require('mongoose')

const app = express();
app.use(express.json()); // To parse Json bodies


//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todo-app',)
.then(()=>console.log("MongoDb connected"))
.catch(err => console.log(err));

// Start server
app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000")
});



// Task Schema and Model

const taskSchema =new mongoose.Schema({
    title: String,
    completed:{type: Boolean, default: false}
});

const Task = mongoose.model("Task", taskSchema);



// Add API Routes

// Create atask (Post / tasks)
app.post('/tasks', async (req, res) => {
    try {
        const task = new Task({title: req.body.title});
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({error: err.message})
    }
});