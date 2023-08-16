const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/auth')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
router.post('/register', register)
router.post('/login', login)


router.post('/verify', async (req, res) => {
  const token = req.body.token

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    console.log(payload)


    res.send({ status: true }).status(StatusCodes.OK)



  } catch (error) {
    res.send({ status: false }).status(StatusCodes.UNAUTHORIZED)
  }
})
module.exports = router
