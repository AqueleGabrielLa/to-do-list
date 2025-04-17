const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const authenticate = require('../middlewares/auth')

router.use(authenticate)

router.post('/', taskController.postTask)
router.get('/', taskController.getTasks)
router.get('/:id', taskController.getTasksById)
router.put('/:id', taskController.putTask)
router.delete('/:id', taskController.deleteTask)

module.exports = router