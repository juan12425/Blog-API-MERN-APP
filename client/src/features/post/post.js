
import { useState } from 'react'
import {selectUserInfo} from '../user/user-slice'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

export function Post(props){
    const {id, createdBy, userId} = props 
    const {token, role} = useSelector(selectUserInfo)
    const [deleted, setDeleted] = useState(false)
    const [modifying, setModifying] = useState(false)
    const [newName, setNewName] = useState('')
    const [name, setName] = useState(props.name)

    const deletePost = async (id) => {
        try {
            const response = await fetch(`/api/v1/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            
            const data = await response.json()
            return data

        } catch (error) {
            console.log(error)
        }
    }

    const updatePostName = async (id, name) => {
        try {
            const response = await fetch(`/api/v1/posts/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name
                })
            })
            const data = await response.json()
            return data

        } catch (error) {
            console.log(error)
        }
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
            if(response.msg == 'Update was successful')
            {
                setName(newName)
            }
        })
        setNewName('')
        setModifying(false)
    }

    if(deleted){
        return
    }
    return(<div className="topic">
        {modifying ? 
            <form onSubmit={handleSubmitModify}> 
                <input className="modify-input" type="text" value={newName} onChange={({target})=> setNewName(target.value)} placeholder="New name" required/>
            </form> : 
        <h2><Link className="links-topics-posts" to={`/resources/dashboard/displaypost?post=${id}`}>{name}</Link></h2>}

        {(userId === createdBy || role !== 'client') && (<div>
            <button className="topic-button modify" onClick={handleClickModify}>modify</button>
            <button className="topic-button delete" onClick={handleClickDelete}>delete</button>
        </div>)}
    </div>)
}