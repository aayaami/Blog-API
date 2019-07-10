const router = require('express').Router()
const mongoose = require('mongoose')
const Comment = require('../models/Comment')

router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find({})
        res.json(comments)
    } catch {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
    const comment = new Comment({
        text: req.body.text,
        useremail: req.body.useremail,
        post: req.body.post
    })
    try {
        const newComment = await comment.save()
        res.status(201).json(newComment)
    } catch {
        res.status(400)
    }
})

router.delete('/:id', getComment, async (req, res) => {
    try {
        await res.comment.delete()
        res.json({ message: 'Deleted comment with id ' + req.params.id})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getComment(req, res, next) {
    let comment
    try {
        comment = await Comment.findById(req.params.id)
        if(comment == null) {
            return res.status(404).json({ message: 'Cannot find comment' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.comment = comment
    next()
}

module.exports = router