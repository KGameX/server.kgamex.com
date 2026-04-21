const express = require("express")
const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN)
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next();
});

const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const questionRoutes = require('./routes/question.routes')
const answerRoutes = require('./routes/answer.routes')

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/question', questionRoutes)
app.use('/answer', answerRoutes)

app.listen(3000, function(err) {
	if (err) console.log(err)
	console.log("Server is listening on port " + 3000)
})