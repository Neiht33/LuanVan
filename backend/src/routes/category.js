var express = require('express')
var router = express.Router()

const categoryController = require("../app/controller/categoryController")

const multer = require('multer');
const upload = multer({ dest: './src/public/uploads' })

router.get('/', categoryController.findAll)
router.post('/', upload.single('img'), categoryController.create)
// router.put('/:id', categoryController.update)
// router.delete('/:id', categoryController.delete)





module.exports = router 