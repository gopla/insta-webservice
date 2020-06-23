const { multerUploads } = require('../../utils/multer')
const verifyToken = require('../../middlewares/verifyToken')
const express = require('express')
const router = express.Router()

const con = require('./video.controller')
const baseUrl = '/video'

router.use(verifyToken)

router.get(`${baseUrl}`, con.index)
router.get(`${baseUrl}/:id`, con.show)
router.get(`${baseUrl}/by-user/:username`, con.user)
router.get(`${baseUrl}/get/following`, con.following)

router.post(`${baseUrl}`, multerUploads, con.store)

router.put(`${baseUrl}/:id`, con.update)
router.put(`${baseUrl}/like/:id`, con.liked)
router.put(`${baseUrl}/unlike/:id`, con.unliked)
router.put(`${baseUrl}/view/:id`, con.viewed)

router.delete(`${baseUrl}/:id`, con.delete)

module.exports = router
