const actionService = require('../service/actionService')

class actionController {

    async findAllCategory(req, res) {
        let accountID = req.params.id
        if (accountID) {
            let result = await actionService.findAllCategory(accountID)
            res.json(result)
        } else res.json('Thất bại')
    }

    async create(req, res) {
        let action = req.body
        if (action) {
            let result = await actionService.create(action.accountID, action.objectID, action.type)
            res.json(result)
        } else res.json('Thất bại')
    }
}

module.exports = new actionController()