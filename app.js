const express = require('express')
const session = require("express-session")
const passport = require("passport")
const env = require('dotenv').config()
const mongoose = require('mongoose')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/api/customers', (req, res) => {
    const customers = [
        {id: 1, firstName: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Steve', lastName: 'Smith'},
        {id: 3, firstName: 'Mary', lastName: 'Swanson'}
    ]

    res.json(customers)
})

const indexRouter = require('./routes/index')
const postsRouter = require('./routes/posts')
const commentsRouter = require('./routes/comments')
const usersRouter = require('./routes/users')

app.use('/api/', indexRouter)
app.use('/api/posts', postsRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/users', usersRouter)

const port = 5000

app.listen(port, () => console.log(`Server started on port ${port}`))