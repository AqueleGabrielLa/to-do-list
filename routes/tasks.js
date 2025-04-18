const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const authenticate = require('../middlewares/auth')
const authOwership = require('../middlewares/authOwership')

router.use(authenticate)

router.post('/', taskController.postTask)
router.get('/', taskController.getTasks)
router.get('/:id', taskController.getTasksById)
router.put('/:id', authOwership('tasks'), taskController.putTask)
router.delete('/:id', authOwership('tasks'), taskController.deleteTask)

module.exports = router