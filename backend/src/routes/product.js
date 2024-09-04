var express = require('express')
var router = express.Router()

const productController = require("../app/controller/productController")

const multer = require('multer');
const upload = multer({ dest: './src/public/uploads' })


router.get('/catalog/main', productController.findByCategoryID)
router.get('/catalog/seek/main', productController.findByCategoryIDSeek)
router.get('/category/filter', productController.findByCategoryFilter)
router.get('/Filter/filter', productController.findByFilter)
router.get('/productdetail/:id', productController.findOneByID)
router.get('/supportImg/:id', productController.findSupportImg)
router.get('/main', productController.findByPage)
router.get('/seek/main', productController.findBySeekPage)
router.get('/Adminseek/main', productController.findBySeekAdminPage)
router.get('/productDiscount', productController.findProductDiscount)
router.get('/', productController.findAll)
router.post('/', upload.fields([{ name: 'img', maxCount: 1 }, { name: 'img1', maxCount: 1 }, { name: 'img2', maxCount: 1 }, { name: 'img3', maxCount: 1 }, { name: 'img4', maxCount: 1 }, { name: 'img5', maxCount: 1 }]), productController.create)
router.put('/updateDiscount', productController.updateDiscount)
// router.delete('/:id', categoryController.delete)

module.exports = router 