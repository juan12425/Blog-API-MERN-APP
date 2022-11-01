import './post.css' 
import { useState } from 'react'
import {selectUserInfo} from '../../user/user-slice'
import { useSelector } from 'react-redux'
import {sendDelete, sendUpdate} from '../../../crud/crud'
import {sendGet, sendPost} from '../../../crud/crud'
import { Reply } from './reply'
import { PostDisplay } from './post-display'

export function Post(props){
    const {id, createdBy, userId, createdAt, username, relatedTopic} = props 
    const {token, role} = useSelector(selectUserInfo)
    const [deleted, setDeleted] = useState(false)
    const [modifying, setModifying] = useState(false)
    const [newName, setNewName] = useState(props.name)
    const [name, setName] = useState(props.name)
    const date = (new Date(createdAt)).toDateString()
    const [newText, setNewText] = useState(props.text)
    const [text, setText] = useState(props.text)
    const [replyText, setReplyText] = useState('')
    const [replies, setReplies] = useState([])

    const deletePost = async (id) => {
        const response = await sendDelete('posts', id, '', token)
        return response
    }

    const updatePost = async (id, name, text) => {
        const response = await sendUpdate('posts', id, '', {name, text}, token)
        return response
    }

    const getReplies = async (relatedPost = '') => {
        const response = await sendGet('posts', '', `relatedPost=${relatedPost}`, token)
        return response
    }

    const handleClickDelete = () => {
        deletePost(id).then(response => {
            if(response.msg === 'Post deleted successfully')
            {
                setDeleted(true)
            }
        })
    }

    const handleClickModify = () => {
        setModifying(true)
    }

    const handleSubmitModify = (event) => {
        event.preventDefault()
        updatePost(id, newName, newText).then(response => {
            if(response.msg === 'Update was successful')
            {
                setName(newName)
                setText(newText)
            }
        })
        setModifying(false)
    }

    const getAndSetReplies = () => {
        getReplies(id).then(response => {
            if(response.posts){
                setReplies(response.posts)
            }
        })
    }

    const handleClickPostTitle = (idFormReply) => {
        if(document.getElementById(idFormReply).style.display === 'block')
        {
            document.getElementById(idFormReply).style.display = 'none'
        }
        else{
            document.getElementById(idFormReply).style.display = 'block'     
            getAndSetReplies()
        }
    }
    
    const createNewReply = async (postName, postText, relatedPost, relatedTopic, isReply) => {
        const response = await sendPost('posts', '', '', {
            name: postName,
            text: postText,
            relatedPost,
            isReply,
            relatedTopic
            
        }, token) 
        return response
    }
    
    const handleSubmitReply = (event) => {
        event.preventDefault()
        createNewReply(`Reply to ${id}`, replyText, id, relatedTopic, true).then(response => {
            if(response.post){
                setReplies(prevReplies => [...prevReplies, response.post])
                setReplyText('')
            }
        })
    }
    
    const handleChangeReplyText = ({target}) => {
        setReplyText(target.value)
    }
    
    const handleDisplayFormReply = (idFormReply) => {
        if(document.getElementById(idFormReply).style.display === 'block')
        {
            document.getElementById(idFormReply).style.display = 'none'
        }
        else{
            document.getElementById(idFormReply).style.display = 'block'
        }
    } 
    
    if(deleted){
        return
    }

    return <PostDisplay 
        replies={replies} 
        data={{modifying, 
            newName, 
            username,
            date,
            id, 
            userId, 
            createdBy, 
            role, 
            text,
            name,
            newText,
        }}
        functions={{handleSubmitModify, 
            setNewName, 
            handleClickPostTitle, 
            handleClickModify, 
            handleClickDelete, 
            setNewText, 
            updatePost,
            deletePost,
            getAndSetReplies,
            handleSubmitReply,
            replyText,
            handleChangeReplyText,
            handleDisplayFormReply
        }} 
        />
}