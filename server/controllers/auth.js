const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require("../errors/custom-error")

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body
  console.log(req.body)
  if (!email || !password) {
    throw new CustomError('Please provide email and password', StatusCodes.BAD_REQUEST)
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new CustomError('Invalid Credentials', StatusCodes.UNAUTHORIZED)
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new CustomError('Invalid Credentials', StatusCodes.UNAUTHORIZED)
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
  register,
  login,
}
