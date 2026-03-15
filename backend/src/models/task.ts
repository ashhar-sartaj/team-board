import mongoose from 'mongoose'
const taskSchema = new mongoose.Schema({
    //title, description, status, cretor, assignedTo
    title: {
        type:String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['todo','in-progress', 'done'],
        default: 'todo'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTo: {
        type: String
    }
}, {
    timestamps: true    
})
const Task = mongoose.model('Task', taskSchema);
export default Task;