import './post.css' 
import { useState } from 'react'
import {selectUserInfo} from '../../user/user-slice'
import { useSelector } from 'react-redux'
import {sendDelete, sendUpdate} from '../../../crud/crud'

export function Post(props){
    const {id, createdBy, userId, createdAt, username, text} = props 
    const {token, role} = useSelector(selectUserInfo)
    const [deleted, setDeleted] = useState(false)
    const [modifying, setModifying] = useState(false)
    const [newName, setNewName] = useState(props.name)
    const [name, setName] = useState(props.name)
    const date = (new Date(createdAt)).toDateString()

    const deletePost = async (id) => {
        const response = await sendDelete('posts', id, '', token)
        return response
    }

    const updatePostName = async (id, name) => {
        const response = await sendUpdate('posts', id, '', {name}, token)
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
        updatePostName(id, newName).then(response => {
            if(response.msg === 'Update was successful')
            {
                setName(newName)
            }
        })
        setModifying(false)
    }

    if(deleted){
        return
    }

    const handleClickPostTitle = (id) => {
        if(document.getElementById(id).style.display === 'block')
        {
            document.getElementById(id).style.display = 'none'
        }
        else{
            document.getElementById(id).style.display = 'block'
        }
    }

    return(
        <div className="topic">
            {modifying ? 
                <form onSubmit={handleSubmitModify}> 
                    <input className="modify-input" type="text" value={newName} onChange={({target})=> setNewName(target.value)} placeholder="New name" required/>
                </form> : 
            <h2 className="post-title" onClick={()=>handleClickPostTitle(id)}>{name}</h2>}
            <p>{username}</p>
            <p>{date}</p>
            <div id={id} className="post-info">
                {(userId === createdBy || role !== 'client') && (<div>
                    <button className="topic-button modify" onClick={handleClickModify}>modify</button>
                    <button className="topic-button delete" onClick={handleClickDelete}>delete</button>
                </div>)}
                <hr className="hr-post"/>
                <p className="post-inner-text">{text}</p>
            </div>
        </div>
    )
}