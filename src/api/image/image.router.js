const { multerUploads } = require('../../utils/multer')
const verifyToken = require('../../middlewares/verifyToken')
const express = require('express')
const router = express.Router()

const con = require('./image.controller')
const baseUrl = '/image'

router.use(verifyToken)

router.get(`${baseUrl}`, con.index)
router.get(`${baseUrl}/:id`, con.show)
router.post(`${baseUrl}`, multerUploads, con.store)
router.put(`${baseUrl}/:id`, con.update)
router.delete(`${baseUrl}/:id`, con.delete)

module.exports = router
