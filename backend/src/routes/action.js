var express = require('express')
var router = express.Router()

const actionController = require("../app/controller/actionController")


router.get('/:id', actionController.findAllCategory)
router.put('/', actionController.create)

module.exports = router 