var express = require('express')
var router = express.Router()

const productController = require("../app/controller/productController")

const multer = require('multer');
const upload = multer({ dest: './src/public/uploads' })


router.get('/', productController.findAll)
router.post('/', upload.fields([{ name: 'img', maxCount: 1 }, { name: 'img1', maxCount: 1 }, { name: 'img2', maxCount: 1 }, { name: 'img3', maxCount: 1 }, { name: 'img4', maxCount: 1 }, { name: 'img5', maxCount: 1 }]), productController.create)
// router.put('/:id', categoryController.update)
// router.delete('/:id', categoryController.delete)

module.exports = router 