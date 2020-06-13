const express = require('express')
const router = express.Router()
const verifyToken = require('../../middlewares/verifyToken')

const con = require('./user.controller')
const baseUrl = '/user'

router.get(`${baseUrl}`, con.index)
router.get(`${baseUrl}/:username`, con.show)
router.get(`${baseUrl}/:username/follower`, con.follower)
router.get(`${baseUrl}/:username/following`, con.following)

router.post(`${baseUrl}`, con.store)
router.post(`${baseUrl}/login`, con.authenticate)

router.put(`${baseUrl}/:id`, con.update)
router.put(`${baseUrl}/update-pass/:id`, con.updatepassword)

router.delete(`${baseUrl}/:id`, con.delete)

router.use(verifyToken)
router.post(`${baseUrl}/follow/:userid`, con.follow)
router.post(`${baseUrl}/unfollow/:userid`, con.unfollow)

module.exports = router
