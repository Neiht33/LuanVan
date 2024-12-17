const accountService = require('../service/accountService')
const customerService = require('../service/customerService')
const cartService = require('../service/cartService')
const { OAuth2Client } = require('google-auth-library');

const bcrypt = require('bcrypt');
const saltRounds = 10;

class accountController {

    async findAll(req, res) {
        let data = await accountService.findAll()
        res.json(data)
    }

    async findByAccountID(req, res) {
        let accountID = req.params.id
        let data = await accountService.findByAccountID(accountID)
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
        let data = await customerService.findOneByPhone(customer.phoneNumber)
        if (data.length == 0) {
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
            }
        } else res.json({ checkPhone: false })
    }

    async createAccountByGoogle(req, res) {
        let googleAccount = req.body
        const client = new OAuth2Client(googleAccount.clienId);

        const ticket = await client.verifyIdToken({
            idToken: googleAccount.credential,
            audience: googleAccount.clienId,
        });

        const payload = ticket.getPayload();

        var account = await customerService.findOneByGmailNoAddress(payload.email)

        if (account.length == 0) {
            await accountService.createGoogleAccount(payload.email)
            const googleID = await accountService.getIdByGmail(payload.email)
            await customerService.createCustomerByGoogle(payload.name, googleID[0].id)
            const customer = await customerService.findOneByGmail(payload.email)
            await accountService.createAccountWithGoogle(customer[0].id, 1)
            const result = await customerService.findOneByGmailNoAddress(payload.email)
            let accountID = await accountService.findOneByCustomerID(customer[0].id)
            await cartService.create(accountID[0].id, 0)
            res.json(result[0])
        } else {
            const find = await customerService.findOneByGmailHadAccount(payload.email)
            find.length > 0 ? res.json(find[0]) : res.json(account[0])
        }
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

    async update(req, res) {
        let account = req.body
        let customer = await customerService.findOneByPhoneHadAccount(account.newPhoneNumber)

        if (account.phoneNumber == account.newPhoneNumber) {
            let data = await customerService.updateCustomer(account.customerID, account.phoneNumber, account.name, account.newPhoneNumber, account.districtID, account.address)
            res.json(account)
        } else
            if (customer.length == 0) {
                let data = await customerService.updateCustomer(account.customerID, account.phoneNumber, account.name, account.newPhoneNumber, account.districtID, account.address)
                res.json(account)
            } else res.json({ checkPhone: false })

    }
}

module.exports = new accountController()