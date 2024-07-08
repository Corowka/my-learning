const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    isDone: {
        type: Boolean,
        default: false,
    },
    body: {
        type: String,
        default: '',
    }
})

const Task = mongoose.model('Task', taskSchema);


module.exports = Task;