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

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        text: req.body.text
    })
    try {
        const newPost = await post.save()
        res.status(201).json(newPost)
    } catch {
        res.status(400)
    }
})

router.get('/:id', getPost, async (req, res) => {
    try {
        res.json(res.post)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.put('/:id', getPost, async (req, res) => {
    res.post.title = req.body.title
    res.post.text = req.body.text
    try {
        await res.post.save()
        res.json({ message: 'Edited post with id ' + req.params.id})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

router.put('/:id/publish', getPost, async (req, res) => {
    res.post.isPublished = true
    try {
        await res.post.save()
        res.json({ message: 'Published post with id ' + req.params.id})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

router.delete('/:id', getPost, async (req, res) => {
    try {
        await res.post.delete()
        res.json({ message: 'Deleted post with id ' + req.params.id})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

async function getPost(req, res, next) {
    let post
    try {
        post = await Post.findById(req.params.id)
        if(post == null) {
            return res.status(404).json({ message: 'Cannot find post' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }

    res.post = post
    next()
}

module.exports = router