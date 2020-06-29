const verifyToken = require('../../middlewares/verifyToken')
const express = require('express')
const router = express.Router()

const con = require('./like.controller')
const baseUrl = '/like'

router.use(verifyToken)

router.get(`${baseUrl}`, con.index)
router.get(`${baseUrl}/by-user`, con.show)
router.get(`${baseUrl}/image/:id`, con.image)
router.get(`${baseUrl}/video/:id`, con.image)

module.exports = router
