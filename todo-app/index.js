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



// 2.Get all tasks (GET /tasks)
app.get('/tasks', async (req,res) => {{
    const tasks = await Task.find();
    res.json(tasks);
}});


// 3.GET a  task (PUT /tasks/:id)

app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id, 
        {completed: req.body.completed},
         {new: true}
          );
          res.json(task);
    } catch (err) {
        res.status(400).json({error: err.message})
    }
});

// DELETE task (DELETE /tasks/:id)

app.delete('/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({message: "Task deleted"});
    }catch (err){
        res.status(400).json({error: err.message});
    }
})
