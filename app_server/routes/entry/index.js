var express = require('express')
var router = express.Router()
var ctrl_index = require('../../controllers/entry/index')
var ctrl_login = require('../../controllers/entry/redir_login')

router.get('/', ctrl_index.index)
router.get('/login', ctrl_login.redir)

module.exports = router
