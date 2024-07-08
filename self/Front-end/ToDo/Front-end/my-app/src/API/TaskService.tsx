import axios from 'axios'
import { Task } from '../models'
import { server } from '../config'

export default class TaskService {

    static async getAll(limit = 10, page = 1) {
        const response = await axios.get(`${server}/task/getAll`)
        return response
    }

    static async add(body: string) {
        console.log({ body: body })
        const response = await axios.post(`${server}/task/add`, { body: body })
        return response
    }

    static async update(task: Task) {
        const response = await axios.put(`${server}/task/update/` + task._id, { isDone: task.isDone, body: task.body })
        return response
    }

    static async remove(_id: string) {
        const response = await axios.delete(`${server}/task/delete/` + _id)
        return response
    }

}