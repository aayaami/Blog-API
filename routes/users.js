const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const mongoose = require('mongoose')

router.get('/', async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch {
        res.status(500).json({ message: err.message })
    }
})

router.post('/signup', async (req, res) => { 
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    })
    try {
        await bcrypt.hash(newUser.password, 5, (err, hash) => {
            newUser.password = hash;
            newUser.save()
            res.status(201).json(newUser)
        })
    } catch {
        res.status(400)
    }
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
    })(req, res, next);
})

router.get('/logout', (req, res) => {
    req.logout()
    res.status(500).json({ message: 'Logged Out' })
})

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if(user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }

    res.user = user
    next()
}

module.exports = router