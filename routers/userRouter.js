const userControllers=require('../controllers/userControllers.js')
const express = require('express')
const router = express.Router()

router.post('/register',userControllers.register)
router.post('/login',userControllers.login)

module.exports = router