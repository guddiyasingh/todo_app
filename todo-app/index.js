const express = require('express');
const mongoose = require('mongoose')

const app = express();
app.use(express.json()); // To parse Json bodies


//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todo-app',)
.then(()=>console.log())