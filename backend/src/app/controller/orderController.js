const orderService = require('../service/orderService')
const cartService = require('../service/cartService')
const productService = require('../service/productService')

class orderController {
    async findAll(req, res) {
        let data = await orderService.findAll()
        res.json(data)
    }

    async findByAccount(req, res) {
        let accountID = req.params.id
        let data = await orderService.findByAccount(accountID)
        res.json(data)
    }

    async findOrderDetailByOrderID(req, res) {
        let orderID = req.params.id
        let data = await orderService.findOrderDetailByOrderID(orderID)
        res.json(data)
    }

    async findOrderDetailByAccountID(req, res) {
        let accountID = req.params.id
        let data = await orderService.findOrderDetailByAccountID(accountID)
        res.json(data)
    }

    async statisticsByDay(req, res) {
        let data = await orderService.statisticsByDay()
        res.json(data)
    }

    async statisticsByMonth(req, res) {
        let data = await orderService.statisticsByMonth()
        res.json(data)
    }

    async statisticsByDayInMonth(req, res) {
        let data = await orderService.statisticsByDayInMonth()
        res.json(data)
    }

    async statisticsOrderByMonth(req, res) {
        let data = await orderService.statisticsOrderByMonth()
        res.json(data)
    }

    async statisticsOrderByDayInMonth(req, res) {
        let data = await orderService.statisticsOrderByDayInMonth()
        res.json(data)
    }

    async statisticsByDayOfWeek(req, res) {
        let data = await orderService.statisticsByDayOfWeek()
        res.json(data)
    }

    async statisticsOrderByDayOfWeek(req, res) {
        let data = await orderService.statisticsOrderByDayOfWeek()
        res.json(data)
    }

    async create(req, res) {
        let order = req.body
        if (order) {
            let result = await orderService.createOrder(order.total, order.statusID, order.paymentMethod, order.accountID, order.paymentStatus)
            let product = await cartService.findAll(order.accountID)
            let newOrder = await orderService.findNewOrderByAccount(order.accountID)
            let cartID = await cartService.findOneByAccountID(order.accountID)
            product.forEach(async (item, index) => {
                await orderService.createOrderDetail(newOrder[0].max, item.id, item.quantityCurrent)
                await productService.updateQuantityProduct(item.quantityCurrent, item.id)
            });
            await cartService.deleteCartDetail(cartID[0].id)
            res.json(result)
        } else res.json('Thất bại')
    }

    async updateStatus(req, res) {
        let order = req.body
        let data = await orderService.updateStatus(order.orderID, order.status, order.paymentStatus)
        res.json(data)
    }
}

module.exports = new orderController()