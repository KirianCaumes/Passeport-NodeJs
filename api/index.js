const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
const UsersController = require('./modules/usersController')
// const morgan = require('morgan')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Log les requêtes
// app.use(morgan('dev'))

// Initialisation de passport
app.use(passport.initialize())

// On appelle (requiert) notre stratégie 
require('./config/passeport')(passport)

app.get('/', (req, res) => res.send('Home'))
app.post('/api/register', UsersController.register)
app.post('/api/login', UsersController.login)
app.get('/api/test', passport.authenticate('jwt', { session: false }), UsersController.test)

app.listen(3000, () => console.log('Example app listening on port 3000!'))