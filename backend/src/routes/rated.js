var express = require('express')
var router = express.Router()

const ratedController = require("../app/controller/ratedController")


router.get('/', ratedController.findAll)
router.get('/productID/:id', ratedController.findByProductID)
router.post('/', ratedController.create)
// router.put('/:id', ratedController.update)
// router.delete('/:id', ratedController.delete)





module.exports = router 