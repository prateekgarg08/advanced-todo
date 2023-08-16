const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task Title is required"],
    maxlength: [50, "Keep title short"]
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    minlength: 5,
    maxlength: 100
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please specify user"]
  },
  deadline: {
    type: Date,
    required: [true, "Deadline is required"]
  }


})

module.exports = new mongoose.model("Task", TaskSchema);