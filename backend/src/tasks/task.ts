import Task from '../models/task.js'
export const createTask = async (req: any, res: any) => {
    try {
        console.log('entered in create task')
        const {title, description, assignedTo} = req.body;
        console.log('received title, description and assignedTo')
        const task  =await Task.create({
            title, 
            description, 
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
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body, //{ title, description, assignedTo } from client
            {new: true}
        )
        return res.json(task)
    } catch(err) {
        return res.status(500).json({ message: 'Server error' });
    }
}
export const deleteTask = async (req: any, res: any) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        return res.json({id: req.params.id, message:'task deleted' });
    } catch(err) {
        return res.status(500).json({ message: 'Server error' });

    }
}