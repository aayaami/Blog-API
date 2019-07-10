import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Post({ match }) {
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [email, setEmail] = useState('')
    const [text, setText] = useState('')

    useEffect(() => {
        fetch(`/api/posts/${match.params.id}`)
            .then(res => res.json())
            .then(post => setPost(post))

        fetch('/api/comments')
            .then(res => res.json())
            .then(comments => setComments(comments))
    }, [])

    const handleSubmit = (e) => {
        const send = {
            text: text,
            useremail: email,
            post: match.params.id
        }
        e.preventDefault()
        axios.post('/api/comments', send)
            .then(response => {
                console.log(response)
                
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            <div className="post">
                <div className="postTitle">{post.title}</div>
                <hr/>
                <div className="postText">{post.text}</div>
                {
                    comments.map(comment =>
                        comment.post === post._id ? 
                        <div>
                            <div>{comment.text}</div>
                            <div>Email: {comment.useremail}</div>
                            <div>Date: {comment.timestamp}</div>
                        </div>
                        : null
                    )
                }
                <form onSubmit={handleSubmit}>
                    <label>email
                        <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </label>
                    <label>Commentary
                        <textarea name="email" value={text} onChange={e => setText(e.target.value)}></textarea>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Post
