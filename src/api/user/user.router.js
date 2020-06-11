const express = require('express')
const router = express.Router()

const con = require('./user.controller')
const baseUrl = '/user'

router.get(`${baseUrl}`, con.index)
router.get(`${baseUrl}/:username`, con.show)
router.post(`${baseUrl}`, con.store)
router.post(`${baseUrl}/login`, con.authenticate)
router.put(`${baseUrl}/:id`, con.update)
router.put(`${baseUrl}/update-pass/:id`, con.updatepassword)
router.delete(`${baseUrl}/:id`, con.delete)

module.exports = router
