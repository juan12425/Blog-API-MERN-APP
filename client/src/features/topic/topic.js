import './topic.css'
import { useState } from 'react'
import {selectUserInfo} from '../user/user-slice'
import { useSelector } from 'react-redux'
import {sendUpdate, sendDelete} from '../../crud/crud'
import { TopicDisplay } from './topic-display';

export function Topic(props){
    const {id, createdBy, userId, date, username} = props 
    const {token, role} = useSelector(selectUserInfo)
    const [deleted, setDeleted] = useState(false)
    const [modifying, setModifying] = useState(false)
    const [newName, setNewName] = useState(props.name)
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
        if(modifying === false)
        {
            setModifying(true)
        }
        else{
            setModifying(false)
        }
    }

    const handleSubmitModify = (event) => {
        event.preventDefault()
        updateTopicName(id, newName).then(response => {
            if(response.msg === 'topic name was updated')
            {
                setName(newName)
            }
        })
        setModifying(false)
    }

    if(deleted){
        return
    }
    
    return <TopicDisplay 
        data={{modifying, 
            newName, 
            id, 
            name, 
            username, 
            formatedDate, 
            userId, 
            createdBy, 
            role
        }}

        functions = {{
            handleSubmitModify, 
            setNewName, 
            handleClickModify, 
            handleClickDelete
        }}        
    />
}