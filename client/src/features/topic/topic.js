import './topic.css'
import { useState } from 'react'
import {selectUserInfo} from '../user/user-slice'
import { useSelector } from 'react-redux'

export function Topic(props){
    const {id, createdBy, userId} = props 
    const {token, role} = useSelector(selectUserInfo)
    const [deleted, setDeleted] = useState(false)
    const [modifying, setModifying] = useState(false)
    const [newName, setNewName] = useState('')
    const [name, setName] = useState(props.name)

    const deleteTopic = async (id) => {
        try {
            const response = await fetch(`/api/v1/topics/${id}`, {
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

    const updateTopicName = async (id, name) => {
        try {
            const response = await fetch('/api/v1/topics', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
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
        deleteTopic(id).then(response => {
            if(response.msg === 'Topic and related posts were successfully deleted')
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
        updateTopicName(id, newName).then(response => {
            if(response.msg == 'topic name was updated')
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
            <h2>{name}</h2>}

            {(userId === createdBy || role !== 'client') && (<div>
                <button className="topic-button modify" onClick={handleClickModify}>modify</button>
                <button className="topic-button delete" onClick={handleClickDelete}>delete</button>
            </div>)}
        </div>)
}