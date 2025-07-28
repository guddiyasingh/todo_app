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