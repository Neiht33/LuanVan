const cartService = require('../service/cartService')

class cartController {
    async findAll(req, res) {
        let accountID = req.params.id
        let data = await cartService.findAll(accountID)
        res.json(data)
    }

    async create(req, res) {
        let cart = req.body
        let result
        let cartID = await cartService.findOneByAccountID(cart.accountID)
        if (cart) {
            let product = await cartService.findOneByCart(cart.productID, cartID[0].id)
            if (product[0]) {
                await cartService.updateCartDetail(product[0].productID, product[0].quantity + cart.quantity, product[0].total + cart.total, cartID[0].id)
                await cartService.updateCart(cartID[0].id)
            } else {
                result = await cartService.addCartDetail(cart.productID, cart.quantity, cart.total, cartID[0].id)
                await cartService.updateCart(cartID[0].id)
            }

            res.json(result)
        } else res.json('Thất bại')
    }

    async updateCartDetail(req, res) {
        let cart = req.body
        let cartID = await cartService.findOneByAccountID(cart.accountID)
        if (cart) {
            let result = await cartService.updateCartDetail(cart.productID, cart.quantity, cart.quantity * cart.price, cartID[0].id)
            await cartService.updateCart(cartID[0].id)
            res.json(result)
        } else res.json('Thất bại')
    }

    async deleteItemCartDetail(req, res) {
        let productID = req.query.productID
        let accountID = req.query.accountID
        let cartID = await cartService.findOneByAccountID(accountID)
        let result = await cartService.deleteItemCartDetail(productID, cartID[0].id)
        await cartService.updateCart(cartID[0].id)
        res.json(result)
    }
}

module.exports = new cartController()