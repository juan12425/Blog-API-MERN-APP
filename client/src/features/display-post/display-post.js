import './display-post.css'
import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import {selectUserInfo} from '../user/user-slice'


export function DisplayPost(){
    const postId = window.location.href.split('post=')[1]
    const {token} = useSelector(selectUserInfo)
    const [postName, setPostName] = useState('')
    const [postText, setPostText] = useState('')

    const getPost = async (id) => {
        try {
            if(token)
            {
                const response = await fetch(`/api/v1/posts?id=${id}`,{
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
    useEffect(()=>{
        getPost(postId).then((response) => {
            console.log(response)
            if(response.posts[0])
            {
                const {name, text} = response.posts[0]
                setPostName(name)
                setPostText(text)
            
            }
        })
    }, [])
    return(<div id="display-posts">
        <h1>{postName}</h1>
        <p className="display-post-text">{postText}</p>
    </div>)
}