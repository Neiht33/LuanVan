var express = require('express')
var router = express.Router()

const orderController = require("../app/controller/orderController")


router.get('/', orderController.findAll)
router.get('/account/:id', orderController.findByAccount)
router.post('/', orderController.create)
// router.put('/:id', orderController.update)
// router.delete('/:id', orderController.delete)





module.exports = router 