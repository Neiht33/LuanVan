var express = require('express')
var router = express.Router()

const orderController = require("../app/controller/orderController")


router.get('/', orderController.findAll)
router.get('/account/:id', orderController.findByAccount)
router.get('/orderID/:id', orderController.findOrderDetailByOrderID)
router.get('/accountID/:id', orderController.findOrderDetailByAccountID)
router.get('/statisticsByDay', orderController.statisticsByDay)
router.get('/statisticsByMonth', orderController.statisticsByMonth)
router.get('/statisticsByDayInMonth', orderController.statisticsByDayInMonth)
router.get('/statisticsOrderByMonth', orderController.statisticsOrderByMonth)
router.get('/statisticsOrderByDayInMonth', orderController.statisticsOrderByDayInMonth)
router.get('/statisticsByDayOfWeek', orderController.statisticsByDayOfWeek)
router.get('/statisticsOrderByDayOfWeek', orderController.statisticsOrderByDayOfWeek)
router.put('/update', orderController.updateStatus)
router.put('/cancel', orderController.cancelOrder)
router.post('/', orderController.create)
// router.delete('/:id', orderController.delete)





module.exports = router 