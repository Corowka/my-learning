const axios = require("axios");

type Task = {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

export const getData = async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
  const titles = response.data.map((task: Task) => task.title)
  return titles
}
