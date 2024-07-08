import React from "react";
import { Task } from "../../models"
import { Input, Button, Checkbox } from 'antd';
import classes from './TaskItem.module.css'

interface TaskItemProps {
    task: Task,
    changeBodyHandler: (
        task: Task,
        body: string,
        save: boolean, 
    ) => void;
    changeDoneHandler: (
        task: Task,
    ) => void;
    removeHandler: (
        _id: string
    ) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, changeBodyHandler, changeDoneHandler, removeHandler }) => {
    return (
        <div className={classes.taskItem}>
            <Checkbox
                className={classes.checkbox}
                checked={task.isDone}
                onClick={() => changeDoneHandler(task)}
            ></Checkbox>
            <Input
                className={classes.input}
                onChange={e => changeBodyHandler(task, e.target.value, false)}
                onBlur={e => changeBodyHandler(task, e.target.value, true)}
                value={task.body}
                placeholder="what do you want to do?"
            />
            <Button
                onClick={() => removeHandler(task._id)}
            >Удалить</Button>
        </div>
    )
}

export default TaskItem;