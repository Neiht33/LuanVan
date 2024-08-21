const ratedService = require('../service/ratedService')
const orderService = require('../service/orderService')

class ratedController {
    async findAll(req, res) {
        let data = await ratedService.findAll()
        res.json(data)
    }

    async findByProductID(req, res) {
        let productID = req.params.id
        let data = await ratedService.findByProductID(productID)
        res.json(data)
    }

    async create(req, res) {
        let rated = req.body
        if (rated) {
            let result = await ratedService.create(rated.accountID, rated.productID, rated.rated, rated.comment)
            await orderService.updateRated(rated.orderID, rated.productID)
            res.json(result)
        } else res.json('Thất bại')
    }
}

module.exports = new ratedController()