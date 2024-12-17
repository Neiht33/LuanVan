const categoryService = require('../service/categoryService')
const path = require('path')
const fs = require('fs');

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

    async update(req, res) {
        let category = req.body

        if (category) {
            let result = await categoryService.update(category.id, category.name, category.group)
            res.json(result)
        } else res.json('Thất bại')
    }

    async delete(req, res) {
        var itemRemove = req.params
        var categoryList = await categoryService.findAll()

        var category = categoryList.find((item) => item.id == itemRemove.id)
        if (category.quantity == 0) {
            await categoryService.delete(itemRemove.id)

            const filePath = path.join(__dirname, '../../public/uploads', category.img); // Đường dẫn đến file

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Lỗi khi xóa file:', err);
                    return;
                }
                console.log('File đã được xóa thành công:', category.img);
            });
            res.json(true)
        } else res.json(false)
    }
}

module.exports = new categoryController()