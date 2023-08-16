const express = require('express')
const router = express.Router();
const { createTask, getAllTasks, getSingleTask, updateTask, deleteTask } = require("../controllers/tasks")
router.route('/').post(createTask).get(getAllTasks);
router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask)

module.exports = router;