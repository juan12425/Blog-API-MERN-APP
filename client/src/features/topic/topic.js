import './topic.css'
import { useState } from 'react'
import {selectUserInfo} from '../user/user-slice'
import { useSelector } from 'react-redux'

export function Topic(props){
    const {id, name, createdBy, userId} = props 
    const token = useSelector(selectUserInfo).token
    const [deleted, setDeleted] = useState(false)

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
    const handleClickDelete = () => {
        deleteTopic(id).then(response => {
            if(response.msg === 'Topic and related posts were successfully deleted')
            {
                setDeleted(true)
            }
        })
    }

    if(deleted){
        return
    }
    return(<div className="topic">
            <h2>{name}</h2>
            {userId === createdBy && (<div>
                <button className="topic-button modify">modify</button>
                <button className="topic-button delete" onClick={handleClickDelete}>delete</button>
            </div>)}
        </div>)
}