var express = require('express')
var router = express.Router()

const cartController = require("../app/controller/cartController")


router.get('/:id', cartController.findAll)
router.put('/', cartController.create)
router.put('/update', cartController.updateCartDetail)
router.delete('/item', cartController.deleteItemCartDetail)





module.exports = router 