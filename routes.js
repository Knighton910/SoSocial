const express = require('express')
// const passport = require('passport')

const User = require('./models/user')
const router = express.Router()

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash('error')
    res.locals.infos = req.flash('info')
    next()
})

router.get('/', function (req, res, next) {
    User.find()
        .sort({ createdAt: 'descending'})
        .exec(function (err, users) {
            if (err) { return next(err) }
            res.render('index', { users: users })
        })
})

// router.get('/signup', function (req, res) {
//     res.render('signup')
// })

// router.post('/signup', function (req, res, next) {
//     const username = req.body.username;
//     const password = req.body.password;
//
//     User.findOne({ username: username }, function (err, user) {
//         if (err) { return next(err)}
//         if (user) {
//             req.flash('error', 'User already exists')
//             return res.redirect('/signup')
//         }
//
//         const newUser = new User({
//             username: username,
//             password: password
//         })
//
//         newUser.save(next)
//     })
// }, passport.authenticate('login', {
//     successRedirect: '/',
//     failureRedirect: '/signup',
//     failureFlash: true
// }))

module.exports = router
