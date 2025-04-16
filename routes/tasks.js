const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const authenticate = require('../middlewares/authMiddleware')

router.use(authenticate)

router.post('/', taskController.createTask)
router.get('/', taskController.getTasks)
router.get('/:id', taskController.getTasksById)
router.put('/:id', taskController.updateTask)
router.delete('/:id', taskController.deleteTask)

module.exports = router