var express = require('express')
var router = express.Router()
var ctrl_redir_login = require('../../controllers/entry/redir_login')

router.get('/login', ctrl_redir_login.redir)

module.exports = router
