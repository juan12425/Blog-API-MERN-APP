import {useEffect} from 'react'
import { useSelector } from 'react-redux'
import {selectUserInfo} from '../user/user-slice'
import { useState } from 'react'
import {sendGet, sendPost} from '../../crud/crud'
import { useSearchParams } from 'react-router-dom'
import { PostsDisplay } from './posts-display'

export function Posts(){
    
    const [searchParams, setSearchParams] = useSearchParams();
    const relatedTopicId = searchParams.get("topic")
    const topicName = searchParams.get("topicname")
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

    return <PostsDisplay 
        posts={posts}
        data={{topicName, 
            newPostName, 
            newPostText,
            userId,
            relatedTopicId
        }}
        functions={{handleClickNewPost,
            handleSubmitNewPost,
            setNewPostName,
            setNewPostText
        }}
    />
}