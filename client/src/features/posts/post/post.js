import './post.css' 
import { useState } from 'react'
import {selectUserInfo} from '../../user/user-slice'
import { useSelector } from 'react-redux'
import {sendDelete, sendUpdate} from '../../../crud/crud'
import {sendGet, sendPost} from '../../../crud/crud'
import { Reply } from './reply'

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

    return(
        <div className="topic">
            {modifying ? 
                <form onSubmit={handleSubmitModify}> 
                    <input className="modify-input" type="text" value={newName} onChange={({target})=> setNewName(target.value)} placeholder="New name" required/>
                    <button className="modify confirm-edit" type="submit">Confirm changes</button>
                </form> : 
            <button className="links-topics-posts cursor-pointer display-post-link" onClick={()=>handleClickPostTitle(id)}>{name}</button>}
            
            <p>{username}</p>
            <p>{date}</p>

            <div id={id} className="post-info">
                {(userId === createdBy || role !== 'client') && (<div>
                    {modifying === false && <><button className="topic-button modify" onClick={handleClickModify}>modify</button>
                    <button className="topic-button delete" onClick={handleClickDelete}>delete</button></>}
                </div>)}
                <hr className="hr-post"/>
                {modifying ? 
                    <form onSubmit={handleSubmitModify}>
                        <textarea className="textarea-modify-post" value={newText} onChange={({target}) => setNewText(target.value)}/>
                    </form> :
                    
                    <div className="post-inner-text">
                        <p className="post-text-first">{text}</p>
                    </div>
                }

                <div>
                    {replies.map((reply, index) => {
                        const {text, username, createdAt, _id, name} = reply
                        const dateReply = (new Date(createdAt)).toDateString()
                        const data = {
                            userId, 
                            createdBy, 
                            role, 
                            _id, 
                            username, 
                            dateReply, 
                            text,
                            name
                        }
                        return <Reply key={index} data={data} updatePost={updatePost} deletePost={deletePost} getAndSetReplies={getAndSetReplies}/>
                    })}

                    <div>
                        <button className="add-reply-button" onClick={() => handleDisplayFormReply(`${id}-form`)}>+ Add Reply</button>
                        <form id={`${id}-form`} className="reply-form" onSubmit={handleSubmitReply}>
                            <textarea className="textarea-reply" value={replyText} onChange={handleChangeReplyText}/>
                            <button className="modify confirm-edit" type="submit">Add reply</button>
                        </form>
                    </div>
                </div>        
            </div>
        </div>
    )
}