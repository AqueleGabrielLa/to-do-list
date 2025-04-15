const express = require('express')
const taskRouter = require('./routes/tasks')
const userRoutes = require('./routes/user')
const app = express()
dotenv.config()
app.use(express.json())
const port = 3000

app.use('/tasks', taskRouter)
app.use('/user', userRoutes)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
