const taskSchema =new mongoose.Schema({
    title: String,
    completed:{type: Boolean, default: false}
})