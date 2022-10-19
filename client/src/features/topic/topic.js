import './topic.css'
import { useState } from 'react'
import {selectUserInfo} from '../user/user-slice'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import {sendUpdate, sendDelete} from '../../crud/crud'

export function Topic(props){
    const {id, createdBy, userId, date} = props 
    const {token, role} = useSelector(selectUserInfo)
    const [deleted, setDeleted] = useState(false)
    const [modifying, setModifying] = useState(false)
    const [newName, setNewName] = useState('')
    const [name, setName] = useState(props.name)
    const formatedDate = (new Date(date)).toDateString()
    
    const deleteTopic = async (id) => {
        const response = await sendDelete('topics', id, '', token)
        return response
    }

    const updateTopicName = async (id, name) => {
        const response = await sendUpdate('topics', '', '', {id,name}, token)
        return response
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
            if(response.msg === 'topic name was updated')
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
        <h2><Link className="links-topics-posts" to={`/resources/dashboard/posts?topic=${id}`}>{name}</Link></h2>}
        <p>{formatedDate}</p>
        {(userId === createdBy || role !== 'client') && (<div>
            <button className="topic-button modify" onClick={handleClickModify}>modify</button>
            <button className="topic-button delete" onClick={handleClickDelete}>delete</button>
        </div>)}
    </div>)
}