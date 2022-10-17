import './dashboard.css'
import {useEffect} from 'react'
import { useSelector } from 'react-redux'
import {selectUserInfo} from '../user/user-slice'
import { useState } from 'react'
import { Topic } from '../topic/topic'

export function Dashboard(){
    
    const token = useSelector(selectUserInfo).token
    const userId = useSelector(selectUserInfo).id
    const [topics, setTopics] = useState([{_id: 'adds', name:'mock', createdBy:'Juan'}])
    const [newTopic, setNewTopic] = useState('')
    const getTopics = async (queryString = '') => {
        try {
            if(token)
            {
                const response = await fetch(`/api/v1/topics?${queryString}`,{
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

    const createNewTopic = async (topicName) => {
        
        try {
            const response = await fetch('/api/v1/topics', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: topicName
                })
            })
            const data = await response.json()
            return data

        } catch (error) {
            console.log(error)
        }
    }

    const handleClickNewTopic = () => {
        
        const newTopicButton = document.getElementById('form-new-topic')
        if(newTopicButton.style.display == 'block')
        {
            newTopicButton.style.display = 'none'
            return
        }

        newTopicButton.style.display = 'block'
    }

    const handleSubmitNewTopic = (event) => {
        event.preventDefault()
        createNewTopic(newTopic).then(response => {
            console.log(response)
            setTopics((prevTopics) => [...prevTopics, response.topic])
        })
        setNewTopic('')
    }

    useEffect(()=>{
        getTopics().then(response => {
            console.log(response)
            setTopics(response.topics)
        })
    }, [])

    return(<div id="dash">
        <h1>Topics</h1>
        <div id="create-new-topic">
            <button id='create-new-topic-button' onClick={handleClickNewTopic}>+ New Topic</button>
            <form id="form-new-topic" onSubmit={handleSubmitNewTopic} style={{display: 'none'}}>
                <input type="text" placeholder="Enter a new topic name" value={newTopic} onChange={({target})=>setNewTopic(target.value)} required/>
                <button type="submit">Create a New Topic</button>
            </form>
        </div>  
        {topics.map((topic, index) => {
            const {_id, name, createdBy} = topic
            return <Topic id={_id} name={name} createdBy={createdBy} userId={userId} key={index}/> 
        }).reverse()}
    </div>)
}
