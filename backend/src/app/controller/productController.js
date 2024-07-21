const productService = require('../service/productService')

class productController {

    async findAll(req, res) {
        let data = await productService.findAll()
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