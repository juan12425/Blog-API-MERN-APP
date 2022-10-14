require('dotenv').config()
require('express-async-errors');

const helmet = require('helmet');
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const express = require('express');
const app = express();
const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authRouter = require('./routes/auth-router')
const userRouter = require('./routes/user-router')
const topicRouter = require('./routes/topic-router')
const postRouter = require('./routes/post-router')
const authMiddleware = require('./middleware/authentication')
const isAdminMiddleware = require('./middleware/is-admin')

app.use(express.json())

app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100
}))
app.use(helmet())
app.use(cors())
app.use(xss())

app.get('/', (req, res) => {
    res.send('Blog API');
}); 

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', authMiddleware, isAdminMiddleware, userRouter)
app.use('/api/v1/topics', authMiddleware, topicRouter)
app.use('/api/v1/posts', authMiddleware, postRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()