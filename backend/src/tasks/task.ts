import Task from '../models/task.js'
export const createTask = async (req: any, res: any) => {
    try {
        console.log('entered in create task')
        const {title, description, status,assignedTo} = req.body;
        console.log('received title, description and assignedTo')
        const task  =await Task.create({
            title, 
            description, 
            status,
            assignedTo,
            creator: req.user.id //from authenticateToken iddleware
        })
        console.log('successfully created')
        return res.status(201).json(task)

    } catch(err) {
        return res.status(500).json({ message: 'Server error' });
    }
}
export const getAllTasks = async (req: any, res: any) => {
    try {
        const allTasks = await Task.find();
        return res.json(allTasks);
    } catch(err) {
        return res.status(500).json({ message: 'Server error' });
    }
}
export const updateTask = async (req: any, res: any) => {
    try {
        const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }
        //only authorised person must be able to update
        if (task.creator && task.creator.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" })
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body, //{ title, description, assignedTo } from client
            {new: true}
        )
        return res.json(updatedTask)
    } catch(err) {
        return res.status(500).json({ message: 'Server error' });
    }
}
export const deleteTask = async (req: any, res: any) => {
    try {

        const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }

        if (task.creator && task.creator.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" })
        }

        await task.deleteOne()

        return res.json({ id: req.params.id, message: "Task deleted" })
    } catch(err) {
        return res.status(500).json({ message: 'Server error' });

    }
}