const { multerUploads } = require('../../utils/multer')
const verifyToken = require('../../middlewares/verifyToken')
const express = require('express')
const router = express.Router()

const con = require('./story.controller')
const baseUrl = '/story'

router.get(`${baseUrl}`, con.index)
router.post(`${baseUrl}`, multerUploads, con.store)

module.exports = router
