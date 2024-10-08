const categoryService = require('../service/categoryService')

class categoryController {
    async findAll(req, res) {
        let data = await categoryService.findAll()
        res.json(data)
    }

    async create(req, res) {
        let category = req.body
        let img = req.file.filename
        if (category) {
            let result = await categoryService.create(category.name, category.group, img)
            res.json(result)
        } else res.json('Thất bại')
    }
}

module.exports = new categoryController()