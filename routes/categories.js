const express = require('express')
const router = express.Router();
const categoryController = require('../controllers/categoriesController')
const authenticate = require('../middlewares/auth')

router.use(authenticate)

router.get('/', categoryController.getCategories)
router.post('/', categoryController.postCategory)
router.put('/:id', categoryController.putCategory)
router.delete('/:id', categoryController.deleteCategory)

module.exports = router