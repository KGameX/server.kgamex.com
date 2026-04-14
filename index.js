const express = require("express")
var cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const userRoutes = require('./routes/user.route')
const questionRoutes = require('./routes/question.routes')
const answerRoutes = require('./routes/answer.routes')

app.use('/user', userRoutes)
app.use('/question', questionRoutes)
app.use('/answer', answerRoutes)

app.listen(3000, function(err) {
	if (err) console.log(err)
	console.log("Server is listening on port " + 3000)
})