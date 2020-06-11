require('dotenv').config()
const { verify } = require('jsonwebtoken')
const { setError } = require('./errorHandler')

module.exports = async (req, res, next) => {
  const header = req.headers.authorization
  const token = header ? header.split(' ')[1] : undefined
  if (!token) {
    res.status(404).json(setError(404, 'Authentication token not found'))
  }

  await verify(token, process.env.JWT_SECRET || '', async (err, payload) => {
    if (err) {
      res.status(403).json(setError(403, err.message || 'Forbidden access'))
    }
    if (!payload) {
      res.status(404).json(setError(404, 'No payload found'))
    }
    req.user = payload
    next()
  })
}
