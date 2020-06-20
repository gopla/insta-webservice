const express = require('express')
const router = express.Router()

const con = require('./vidcomment.controller')
const baseUrl = '/comment/video'

router.get(`${baseUrl}`, con.index)
router.get(`${baseUrl}/:id_post`, con.show)

router.post(`${baseUrl}/:id_post`, con.store)

router.put(`${baseUrl}/:id`, con.update)
router.put(`${baseUrl}/like/:id`, con.like)
router.put(`${baseUrl}/unlike/:id`, con.unlike)

router.delete(`${baseUrl}/:id`, con.delete)

module.exports = router
