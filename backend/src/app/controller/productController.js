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

    async findBySeekAdminPage(req, res) {
        let seek = req.query.seek
        let data = await productService.findBySeekAdminPage(seek)
        res.json(data)
    }

    async findBySeekPage(req, res) {
        let seek = req.query.seek
        let page = Number(req.query.page)
        let data = await productService.findBySeekPage(seek, page * 12 - 11, page * 12)
        let total = await productService.findBySeekAdminPage(seek)
        if (data[0]) {
            data[0].total = total.length
        }
        res.json(data)
    }

    async findByCategoryID(req, res) {
        let id = Number(req.query.id)
        let page = Number(req.query.page)
        let data = await productService.findByCategoryID(id, page * 12 - 11, page * 12)
        res.json(data)
    }

    async findByCategoryIDSeek(req, res) {
        let id = Number(req.query.id)
        let page = Number(req.query.page)
        let data = await productService.findByCategoryIDSeek(req.query.seek, id, page * 12 - 11, page * 12)
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
        let data = await productService.findByCategoryFilter(price1, price2, age, gender, req.query.seek, Number(req.query.categoryID), page * 12 - 11, page * 12)
        let total = await productService.getTotalByCategoryFilter(price1, price2, age, gender, req.query.seek, Number(req.query.categoryID))
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
        let data = await productService.findByFilter(price1, price2, age, gender, req.query.seek, page * 12 - 11, page * 12)
        let total = await productService.getTotalByFilter(price1, price2, age, gender, req.query.seek)
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

    async findProductDiscount(req, res) {
        let data = await productService.findProductDiscount()
        res.json(data.filter((product, index) => index < 10))
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

    async updateProduct(req, res) {
        let product = req.body
        let data
        if (product.newWareHouse >= product.oldWareHouse) {
            data = await productService.updateProductIncrease(product.name, product.price, product.category, product.description, product.oldWareHouse, product.newWareHouse, product.id)
        } else
            if (product.newWareHouse < product.oldWareHouse) {
                data = await productService.updateProductDecrease(product.name, product.price, product.category, product.description, product.oldWareHouse, product.newWareHouse, product.id)
            }
        res.json(data)
    }

    async updateDiscount(req, res) {
        let product = req.body
        let data = await productService.updateDiscount(product.id, product.discount)
        res.json(data)
    }
}

module.exports = new productController()