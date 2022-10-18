import {useEffect} from 'react'
import { useSelector } from 'react-redux'
import {selectUserInfo} from '../user/user-slice'
import { useState } from 'react'
import { Topic } from '../topic/topic'
import { Post } from '../post/post'

export function Posts(){
    
    const relatedTopicId = window.location.href.split('topic=')[1]
    const token = useSelector(selectUserInfo).token
    const userId = useSelector(selectUserInfo).id
    const [posts, setPosts] = useState([])
    const [newPostName, setNewPostName] = useState('')
    const [newPostText, setNewPostText] = useState('')
    const [topicId, setTopicId] = useState('')

    const getPosts = async (relatedTopic = '') => {
        try {
            if(token)
            {
                const response = await fetch(`/api/v1/posts?relatedTopic=${relatedTopic}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()
                return data
            }
        } catch (error) {
            console.log(error)
        }
    }

    const createNewPost = async (postName, postText, relatedTopic) => {
        
        try {
            const response = await fetch('/api/v1/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: postName,
                    text: postText,
                    relatedTopic: relatedTopicId
                })
            })
            const data = await response.json()
            return data

        } catch (error) {
            console.log(error)
        }
    }

    const handleClickNewPost = () => {
        
        const newTopicButton = document.getElementById('form-new-topic')
        if(newTopicButton.style.display == 'block')
        {
            newTopicButton.style.display = 'none'
            return
        }

        newTopicButton.style.display = 'block'
    }

    const handleSubmitNewPost = (event) => {
        event.preventDefault()
        createNewPost(newPostName, newPostText, topicId).then(response => {
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
            console.log(response)
        })
    }, [])

    return(<><h1>Posts</h1>
        
        <div id="create-new-topic">
            <button id='create-new-topic-button' onClick={handleClickNewPost}>+ New Post</button>
            <form id="form-new-topic" onSubmit={handleSubmitNewPost} style={{display: 'none'}}>
                <input type="text" placeholder="Enter a post name" value={newPostName} onChange={({target})=>setNewPostName(target.value)} required/>
                <textarea style={{width: '90%', height: '200px'}} placeholder="Write your ideas" value={newPostText} onChange={({target})=>setNewPostText(target.value)} required/>
                <button type="submit">Create a New Post</button>
            </form>
        </div>  

        {posts.map((topic, index) => {
            const {_id, name, createdBy} = topic
            return <Post id={_id} name={name} createdBy={createdBy} userId={userId} key={index}/> 
        }).reverse()}

    </>)
}