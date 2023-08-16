const Task = require("../models/Task")
const { StatusCodes } = require("http-status-codes")
const CustomError = require('../errors/custom-error')
const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ task });
}

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.userId })
  res.status(StatusCodes.OK).json({ tasks, nBits: tasks.length })
}

const getSingleTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req
  const task = await Task.findOne({ createdBy: userId, _id: taskId })
  if (!task) {
    throw new CustomError('Task not found ', StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json({ task })
}


const updateTask = async (req, res) => {
  const {
    body: { isCompleted, title, description, deadline },
    user: { userId },
    params: { id: taskId },
  } = req

  if (title === '' || deadline === '' || isCompleted === '') {
    throw new CustomError(' fields cannot be empty', StatusCodes.BAD_REQUEST)
  }
  const task = await Task.findByIdAndUpdate(
    { _id: taskId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!task) {
    throw new CustomError(`No task with id ${taskId}`, StatusCodes.NOT_FOUND)
  }
  res.status(StatusCodes.OK).json({ task })
}

const deleteTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req

  const task = await Task.findByIdAndRemove({
    _id: taskId,
    createdBy: userId,
  })
  if (!job) {
    throw new CustomError(`No task with id ${taskId}`, StatusCodes.NOT_FOUND)
  }
  res.status(StatusCodes.OK).send()
}

module.exports = { createTask, getAllTasks, getSingleTask, updateTask, deleteTask }