const productService = require('../service/productService')

class productController {

    async findAll(req, res) {
        let data = await productService.findAll()
        res.json(data)
    }

    async findByPage(req, res) {
        let page = Number(req.query.page)
        let data = await productService.findByPage(page * 12 - 11, page * 12)
        res.json(data)
    }

    async findByCategoryID(req, res) {
        let id = Number(req.query.id)
        let page = Number(req.query.page)
        let data = await productService.findByCategoryID(id, page * 12 - 11, page * 12)
        res.json(data)
    }

    async findByCategoryFilter(req, res) {
        let price1, price2
        if (req.query.price) {
            price1 = Number(req.query.price.substring(0, req.query.price.indexOf(',')))
            price2 = Number(req.query.price.substring(req.query.price.indexOf(',') + 1, req.query.price.length))
        }
        let age = Number(req.query.age)
        let gender = Number(req.query.gender)
        let page = Number(req.query.page)
        let data = await productService.findByCategoryFilter(price1, price2, age, gender, Number(req.query.categoryID), page * 12 - 11, page * 12)
        let total = await productService.getTotalByFilter(price1, price2, age, gender, Number(req.query.categoryID))
        if (data.length != 0) {
            data[0] = {
                ...data[0],
                total: total.length
            }
        }
        res.json(data)
    }

    async findByFilter(req, res) {
        let price1, price2
        if (req.query.price) {
            price1 = Number(req.query.price.substring(0, req.query.price.indexOf(',')))
            price2 = Number(req.query.price.substring(req.query.price.indexOf(',') + 1, req.query.price.length))
        }
        let age = Number(req.query.age)
        let gender = Number(req.query.gender)
        let page = Number(req.query.page)
        let data = await productService.findByFilter(price1, price2, age, gender, page * 12 - 11, page * 12)
        let total = await productService.getTotalByFilter(price1, price2, age, gender)
        if (data.length != 0) {
            data[0] = {
                ...data[0],
                total: total.length
            }
        }
        res.json(data)
    }

    async findOneByID(req, res) {
        let id = req.params.id
        let data = await productService.findOneByID(id)
        res.json(data)
    }

    async findSupportImg(req, res) {
        let id = req.params.id
        let data = await productService.findSupportImg(id)
        res.json(data)
    }

    async create(req, res) {
        let product = req.body
        let img = req.files['img'][0]

        if (product) {
            let result = await productService.create(product.name, img.filename, product.price, product.quantity, product.age, product.category, product.description, product.gender)
            let newID = await productService.findNewID()
            if (req.files['img1']) {
                await productService.uploadMultiple(req.files['img1'][0].filename, newID[0].IDMax)
            }
            if (req.files['img2']) {
                await productService.uploadMultiple(req.files['img2'][0].filename, newID[0].IDMax)
            }
            if (req.files['img3']) {
                await productService.uploadMultiple(req.files['img3'][0].filename, newID[0].IDMax)
            }
            if (req.files['img4']) {
                await productService.uploadMultiple(req.files['img4'][0].filename, newID[0].IDMax)
            }
            if (req.files['img5']) {
                await productService.uploadMultiple(req.files['img5'][0].filename, newID[0].IDMax)
            }
            res.json(result)
        } else res.json('Thất bại')
    }
}

module.exports = new productController()