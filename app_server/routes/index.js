'use strict'

var express = require('express')
//var session = require('express-session');
var router = express.Router()
var ctrl_index = require('../controllers/index')
var ctrl_signup = require('../controllers/signup')

console.log(ctrl_signup)
// Index
router.get('/', ctrl_index.index)

// Signup
router.get('/signup', ctrl_signup.GET)
router.post('/signup', ctrl_signup.POST)

module.exports = router
