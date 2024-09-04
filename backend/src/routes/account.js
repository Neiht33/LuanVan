var express = require('express')
var router = express.Router()

const accountController = require("../app/controller/accountController")


router.get('/', accountController.findAll)
router.get('/accountID/:id', accountController.findByAccountID)
router.get('/customer', accountController.findAccountByPhone)
router.get('/address', accountController.getCity)
router.get('/address/district/:id', accountController.getDistrictFromCity)
router.post('/', accountController.create)
router.put('/update', accountController.update)
// router.delete('/:id', accountController.delete)





module.exports = router 