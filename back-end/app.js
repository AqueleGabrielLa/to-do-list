const express = require('express')
const taskRouter = require('./routes/tasks')
const userRoutes = require('./routes/user')
const categoriesRoutes = require('./routes/categories')
const cors = require('cors')
const app = express()
app.use(express.json())

app.use(cors())

app.use('/tasks', taskRouter)
app.use('/user', userRoutes)
app.use('/categories', categoriesRoutes)

const port = 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})