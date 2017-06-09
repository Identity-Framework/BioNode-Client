'use strict'

var express = require('express')
//var session = require('express-session');
var router = express.Router()
var ctrl_index = require('../controllers/index')
var ctrl_signup = require('../controllers/signup')

router.get('/', ctrl_index.index)
router.get('/signup', ctrl_signup.signup)
router.post('/signup', ctrl_signup.signup)

module.exports = router
