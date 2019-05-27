//Librairies 
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')()
const expressSession = require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//About db
mongoose.connect('mongodb://@mongo/test', { user: 'root', pass: 'root', auth: { authdb: "admin" }, useNewUrlParser: true })
const Users = mongoose.model('myusers', new Schema({
    username: String,
    password: String
}), 'myusers')

//Passeport 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSession)
app.use(cookieParser)
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {
    Users.findById(id, (err, user) => done(err, user))
})
passport.use(new LocalStrategy(
    (username, password, done) => {
        Users.findOne(
            { username: username },
            (err, user) => {
                if (err) return done(err)
                if (!user) return done(null, false)
                if (user.password != password) return done(null, false)
                return done(null, user)
            })
    }
))

//Routes
app.get('/', (req, res) => res.sendFile('auth.html', { root: __dirname }))
app.get('/success', (req, res) => res.send("Welcome " + req.query.username + "!!<br><a href='/coucou'>Go to coucou</a>"))
app.get('/error', (req, res) => res.send("error logging in"))
app.post('/',
    passport.authenticate('local', { failureRedirect: '/error' }),
    (req, res) => res.redirect('/success?username=' + req.user.username)
)
app.get('/coucou',
    (req, res) => {
        console.log('Cookies: ', req.cookies)
        res.send('Wow, ca marche bien !')
    } 
)




app.listen(3000, () => console.log('App listening on port ' + 3000))