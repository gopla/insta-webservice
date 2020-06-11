const userService = require('./user.service')

module.exports = {
  index: async (req, res) => {
    try {
      const userResp = await userService.getAllUser()
      res.json(userResp)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },
  show: async (req, res) => {
    try {
      const userResp = await userService.getUserByUsername(req.params.username)
      res.json(userResp)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },
  store: async (req, res) => {
    try {
      const { name, username, password } = req.body
      const userResp = await userService.storeNewUser({
        name,
        username,
        password,
      })
      res.json(userResp)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },
  update: async (req, res) => {
    try {
      const { desc, image, location, name, username } = req.body
      const userResp = await userService.updateUser(req.params.id, {
        desc,
        image,
        location,
        name,
        username,
      })
      res.json(userResp)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },
  delete: async (req, res) => {
    try {
      await userService.deleteuser(req.params.id)
      res.json({ isSuccess: true, message: 'Data deleted' })
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },
  authenticate: async (req, res) => {
    try {
      const { username, password } = req.body
      const token = await userService.authenticate({ username, password })
      res.json({ isSuccess: true, token: token })
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },
  updatepassword: async (req, res) => {
    try {
      const { curPass, newPass, conPass } = req.body
      await userService.changePass(req.params.id, {
        curPass,
        newPass,
        conPass,
      })
      res.json({ isSuccess: true, message: 'Password updated' })
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },
}
