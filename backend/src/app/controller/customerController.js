const accountService = require('../service/accountService')

class customerController {
    async findAll(req, res) {
        let data = await customerService.findAll()
        res.json(data)
    }

    async create(req, res) {
        let customer = req.body
        if (customer) {
            let result = await accountService.createCustomer(customer.name, customer.phoneNumber, customer.address)
            await accountService.createAccount()
            res.json(result)
        } else res.json('Thất bại')
    }

}

module.exports = new customerController()