const express = require('express')
const router = express.Router();
const categoryController = require('../controllers/categoriesController')
const authenticate = require('../middlewares/auth');
const authOwership = require('../middlewares/authOwership');

router.use(authenticate)

router.get('/', categoryController.getCategories)
router.post('/', categoryController.postCategory)
router.put('/:id', authOwership('categories'), categoryController.putCategory)
router.delete('/:id', authOwership('categories'), categoryController.deleteCategory)

module.exports = router