import {useEffect} from 'react'
import { useSelector } from 'react-redux'
import {selectUserInfo} from '../user/user-slice'
import { useState } from 'react'
import { Post } from './post/post'
import {sendGet, sendPost} from '../../crud/crud'

export function Posts(){
    
    const relatedTopicId = window.location.href.split('topic=')[1]
    const token = useSelector(selectUserInfo).token
    const userId = useSelector(selectUserInfo).id
    const [posts, setPosts] = useState([])
    const [newPostName, setNewPostName] = useState('')
    const [newPostText, setNewPostText] = useState('')

    const getPosts = async (relatedTopic = '') => {
        const response = await sendGet('posts', '', `relatedTopic=${relatedTopic}`, token)
        return response
    }

    const createNewPost = async (postName, postText, relatedTopic) => {
        const response = await sendPost('posts', '', '', {
            name: postName,
            text: postText,
            relatedTopic
        }, token) 
        return response
    }

    const handleClickNewPost = () => {
        
        const newTopicButton = document.getElementById('form-new-topic')
        if(newTopicButton.style.display === 'block')
        {
            newTopicButton.style.display = 'none'
            return
        }

        newTopicButton.style.display = 'block'
    }

    const handleSubmitNewPost = (event) => {
        event.preventDefault()
        createNewPost(newPostName, newPostText, relatedTopicId).then(response => {
            if(response.post)
            {
                setPosts((prevPosts) => [...prevPosts, response.post])
            }
        })
        setNewPostName('')
        setNewPostText('')
    }

    useEffect(()=>{
        getPosts(relatedTopicId).then(response => {
            setPosts(response.posts)
        })
    }, [])

    return(<>
        <h1>Posts</h1>
        <div id="create-new-topic">
            <button id='create-new-topic-button' onClick={handleClickNewPost}>+ New Post</button>
            <form id="form-new-topic" onSubmit={handleSubmitNewPost} style={{display: 'none'}}>
                <input type="text" placeholder="Enter a post name" value={newPostName} onChange={({target})=>setNewPostName(target.value)} required/>
                <textarea style={{width: '90%', height: '200px'}} placeholder="Write your ideas" value={newPostText} onChange={({target})=>setNewPostText(target.value)} required/>
                <button type="submit">Create a New Post</button>
            </form>
        </div>  

        {posts.map((post, index) => {
            const {_id, name, createdBy, createdAt, username, text} = post
            return <Post id={_id} name={name} createdBy={createdBy} userId={userId} createdAt={createdAt} username={username} text={text} key={index}/> 
        }).reverse()}
    </>)
}