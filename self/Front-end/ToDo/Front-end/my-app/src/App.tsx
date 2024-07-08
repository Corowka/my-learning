import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/list/TaskList';
import TaskForm from './components/form/TaskForm';
import { Task } from './models'
import useFetching from './hooks/useFetching'
import TaskService from './API/TaskService';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function App() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [tasks, setTasks] = useState<Task[]>([])
  const [fetchTasks, isLoading, fetchError] = useFetching(async (id) => {
    const response = await TaskService.getAll()
    setTasks(response.data.tasks)
  })
  useEffect(() => {
    fetchTasks()
  }, [])

  async function changeTaskBodyHandler(
    task: Task,
    body: string,
    save: boolean,
  ) {
    try {
      const newTask: Task = { ...task, body: body };
      if (save) {
        await TaskService.update(newTask);
      }
      const newTasks: Task[] = tasks.map(t => (t._id === newTask._id) ? newTask : t);
      setTasks(newTasks);
    } catch (error) {
      alert(error);
    }
  }

  async function changeTaskDoneHandler(
    task: Task,
  ) {
    try {
      const newTask: Task = { ...task, isDone: !task.isDone };
      await TaskService.update(newTask);
      const newTasks: Task[] = tasks.map(task => (task._id === newTask._id) ? newTask : task);;
      setTasks(newTasks);
    } catch (error) {
      alert(error);
    }
  }

  async function removeTaskHandler(
    _id: string
  ) {
    try {
      await TaskService.remove(_id)
      const newTasks: Task[] = tasks.filter(task => task._id !== _id);
      setTasks(newTasks);
    } catch (error) {
      alert(error);
    }
  }

  async function addTaskHandler(
    body: string
  ) {
    try {
      const response = await TaskService.add(body)
      setTasks([...tasks, response.data.task])
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="App">
      <div className="wrapper">
        <TaskForm
          addTask={addTaskHandler}
        />
        {isLoading
          ? <Spin style={{ margin: '0 auto', width: '100%' }} indicator={antIcon} />
          : <TaskList
            tasks={tasks}
            setTasks={setTasks}
            changeBodyHandler={changeTaskBodyHandler}
            changeDoneHandler={changeTaskDoneHandler}
            removeHandler={removeTaskHandler}
          ></TaskList>}
        {fetchError && <h2 className='error'>TaskFetch Error: {fetchError}</h2>}
      </div>
    </div>
  );
}

export default App;
