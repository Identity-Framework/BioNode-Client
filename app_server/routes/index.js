var express = require('express');
var session = require('express-session');
var router = express.Router();
var webid = require('webid/tls');
var ctrl_main = require('../controllers/main');

router.get('/', ctrl_main.index);

module.exports = router;
