use 'strict'

var express = require('express')
var session = require('express-session')
var router = express.Router()
var ctrl_signup = require('../controllers/signup')

router.get('/signup', ctrl_signup.signup)

module.exports = router
