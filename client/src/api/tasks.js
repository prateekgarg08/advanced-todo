import axios from "axios"
import "../axios"
import { toast } from 'react-toastify'

const createTask = async (details) => {
  try {
    const { data } = await axios.post('/tasks', details)
    return data
  }
  catch (err) {
    console.log(err)
    return err
  }
}

const getAllTasks = async () => {
  try {
    const { data } = await axios.get('/tasks')
    return data
  }
  catch (err) {
    console.log(err)
  }
}
const deleteTask = async (id) => {
  try {
    const { data } = await axios.delete(`/tasks/${id}`)
    return data
  }
  catch (err) {
    return err
  }
}

const updateTask = async (id, details) => {
  try {
    // toast("Please Wait")
    const { data } = await axios.patch(`/tasks/${id}`, details)
    console.log(data)
    toast.success("Updated SuccesFully")
    return data;
  }
  catch (err) {
    toast(err.toString())
    return err;
  }
}
export { createTask, getAllTasks, deleteTask, updateTask }