import axios from "axios"
import '../axios'
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
    const { data } = await axios.post('/auth/login', details)
    console.log(data)

    return data
  }
  catch (error) {
    return error
  }
}

export { verifyToken, login }