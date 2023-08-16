import axios from 'axios'

// axios.defaults.baseURL = 'https://prateeks-blog.onrender.com/api/v1'
axios.defaults.baseURL = 'https://advanced-todo-85xs.onrender.com/api/v1'

axios.interceptors.request.use(function (req) {
  const token = localStorage && localStorage.getItem('token')
    ? 'Bearer ' + localStorage.getItem('token')
    : null
  if (token) {
    req.headers.Authorization = `${token}`
  }
  return req
})