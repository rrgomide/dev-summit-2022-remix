import axiosConfig from 'axios'
import { v4 as uuid } from 'uuid'

const axios = axiosConfig.create({ baseURL: 'http://localhost:3001/' })

async function apiGetTasks() {
  const { data: tasks } = await axios.get('/tasks')
  return tasks
}

async function apiToggleComplete(id: string) {
  const url = `/tasks/${id}`
  const { data: currentTask } = await axios.get(url)
  await axios.patch(url, { ...currentTask, completed: !currentTask.completed })
}

async function apiCreateTask(description: string) {
  const id = uuid()
  await axios.post('/tasks', { id, description, completed: false })
  return id
}

async function apiDeleteTask(id: string) {
  const url = `/tasks/${id}`
  await axios.delete(url)
}

export { apiGetTasks, apiToggleComplete, apiCreateTask, apiDeleteTask }
