const Task = require('./models/task');

class taskController {

    async getAll(req, res) {
        try {
            const tasks = await Task.find({});
            return res.json({ tasks });
        } catch (e) {
            console.error('Ошибка при выполнении запроса:', e.message);
            return res.status(400).json({ message: e.message });
        }
    }

    async add(req, res) {
        try {
            const { body } = req.body;
            const newTask = new Task({ isDone: false, body: body });
            const savedTask = await newTask.save();
            return res.status(201).json({ task: savedTask });
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error.message);
            return res.status(400).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const taskId = req.params.id;
            const { isDone, body } = req.body;
            const updatedTask = await Task.findByIdAndUpdate(taskId, { isDone, body }, { new: true });
    
            if (!updatedTask) {
                return res.status(404).json({ message: 'Задача не найдена' });
            }
    
            return res.json({ task: updatedTask });
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error.message);
            return res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const taskId = req.params.id;
            const deletedTask = await Task.findByIdAndDelete(taskId);
    
            if (!deletedTask) {
                return res.status(404).json({ message: 'Задача не найдена' });
            }
    
            return res.json({ message: 'Задача успешно удалена' });
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error.message);
            return res.status(400).json({ message: error.message });
        }
    }

}

module.exports = new taskController();