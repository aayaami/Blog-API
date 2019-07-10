const router = require('express').Router()
const mongoose = require('mongoose')
const Post = require('../models/Post')

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({})
        res.json(posts)
    } catch {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router