const router = require('express').Router()
const mongoose = require('mongoose')

router.get('/', (req, res) => {
    res.json({message: 'index page'})
})

module.exports = router