import axios from "axios"
import '../axios'
import { toast } from "react-toastify"
const verifyToken = async (token) => {
  try {
    const { data } = await axios.post('/auth/verify', { token })
    console.log(data)
    return data;
  }
  catch (err) {
    // localStorage.removeItem('token')
    return err;
  }
}

const login = async (details) => {
  try {
    toast("please wait")
    const { data } = await axios.post('/auth/login', details)
    console.log(data)
    toast.success("login success")
    return data
  }
  catch (error) {
    toast.error(error.toString())
    return error
  }
}

const signin = async (details) => {
  try {
    toast("Please wait")
    const { data } = await axios.post('/auth/register', details)
    console.log(data)
    toast.success("sigin success")

    return data
  }
  catch (error) {
    toast.error(error.toString())

    return error
  }
}

export { verifyToken, login, signin }