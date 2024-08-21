const accountService = require('../service/accountService')
const customerService = require('../service/customerService')
const cartService = require('../service/cartService')

const bcrypt = require('bcrypt');
const saltRounds = 10;

class accountController {

    async findAll(req, res) {
        let data = await accountService.findAll()
        res.json(data)
    }

    async findAccountByPhone(req, res) {
        let phone = req.query.phone
        let password = req.query.password
        let account = await customerService.findOneByPhoneHadAccount(phone)
        if (account[0]) {
            bcrypt.compare(password, account[0].password, function (err, result) {
                account[0].password = ''
                result == true ? res.json(account) : res.json({ checkPassword: false })
            });
        } else res.json({ checkPhone: false })
    }

    async create(req, res) {
        let customer = req.body
        let result
        if (customer) {
            //Băm mật khẩu 
            bcrypt.hash(`${customer.password}`, saltRounds, async function (err, hash) {
                if (err) throw err;
                result = await customerService.createCustomer(customer.name, customer.phoneNumber, customer.address, customer.district)
                let customerID = await customerService.findOneByPhone(customer.phoneNumber)
                await accountService.createAccount(customerID[0].id, hash, 1)
                let accountID = await accountService.findOneByCustomerID(customerID[0].id)
                await cartService.create(accountID[0].id, 0)
            });
            res.json(result)
        } else res.json('Thất bại')
    }

    async getCity(req, res) {
        let data = await accountService.getCity()
        res.json(data)
    }

    async getDistrictFromCity(req, res) {
        let id = req.params.id
        let data = await accountService.getDistrictFromCity(id)
        res.json(data)
    }
}

module.exports = new accountController()