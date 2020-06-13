const express = require('express')
const router = express.Router()

const con = require('./imgcomment.controller')
const baseUrl = '/comment/image'

router.get(`${baseUrl}`, con.index)
router.get(`${baseUrl}/:id_post`, con.show)
router.post(`${baseUrl}/:id_post`, con.store)
router.put(`${baseUrl}/:id`, con.update)
router.delete(`${baseUrl}/:id`, con.delete)

module.exports = router
