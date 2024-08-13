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
}

module.exports = new orderController()