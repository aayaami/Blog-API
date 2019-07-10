import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

function Posts() {
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(posts => setPosts(posts))

        fetch('/api/comments')
            .then(res => res.json())
            .then(comments => setComments(comments))
    }, [])

    return (
        <div>
                {
                posts.map(post =>
                    <div className="post">
                        <div className="postTitle"><Link to={`/posts/${post._id}`}>{post.title}</Link></div>
                        <hr/>
                        <div className="postText">{post.text}</div>
                        {
                            comments.map(comment =>
                                comment.post === post._id ? <div>{comment.text}</div> : null
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Posts
