//use 'strict'

var express = require('express')
//var session = require('express-session');
var router = express.Router()
var ctrl_index = require('../controllers/index')

router.get('/', ctrl_index.index)

module.exports = router
