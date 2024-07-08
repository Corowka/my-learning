import React from "react";
import { Task } from '../../models'
import TaskItem from '../item/TaskItem'
import classes from './TaskList.module.css'

interface TaskListProps {
    tasks: Task[];
    setTasks: (task: Task[]) => void;
    changeBodyHandler: (
        task: Task,
        body: string,
        save: boolean, 
    ) => void;
    changeDoneHandler: (
        task: Task
    ) => void;
    removeHandler: (
        _id: string
    ) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks, changeBodyHandler, changeDoneHandler, removeHandler }) => {
    return (
        <div>
            {tasks.length !== 0
                ? <div className={classes.list}>
                    {tasks.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            changeBodyHandler={changeBodyHandler}
                            changeDoneHandler={changeDoneHandler}
                            removeHandler={removeHandler}
                        ></TaskItem>
                    ))
                    }
                </div>
                : <h3 className={classes.noItems}>Задач на сегодня пока нет 😎🌴</h3>}
        </div>
    )
}

export default TaskList;