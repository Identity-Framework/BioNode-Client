var express = require('express')
var session = require('express-session')
var router = express.Router()
var ctrl_auth = require('../controllers/auth')

router.get('/auth', ctrl_auth.auth)

module.exports = router
