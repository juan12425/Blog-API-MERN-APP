import {useEffect} from 'react'
import { useSelector } from 'react-redux'
import {selectUserInfo} from '../user/user-slice'
import { useState } from 'react'
import { Topic } from '../topic/topic'
import {sendGet, sendPost} from '../../crud/crud'

export function Topics(){
    const token = useSelector(selectUserInfo).token
    const userId = useSelector(selectUserInfo).id
    const [topics, setTopics] = useState([])
    const [newTopic, setNewTopic] = useState('')
    
    const getTopics = async (queryString = '') => {
        const res = await sendGet('topics', '', queryString, token)
        return res
    }

    const createNewTopic = async (topicName) => {
        const res = await sendPost('topics', '', '', {name: topicName}, token)
        return res
    }

    const handleClickNewTopic = () => {
        
        const newTopicButton = document.getElementById('form-new-topic')
        if(newTopicButton.style.display === 'block')
        {
            newTopicButton.style.display = 'none'
            return
        }

        newTopicButton.style.display = 'block'
    }

    const handleSubmitNewTopic = (event) => {
        event.preventDefault()
        createNewTopic(newTopic).then(response => {
            if(response.topic)
            {
                setTopics((prevTopics) => [...prevTopics, response.topic])
            }
        })
        setNewTopic('')
    }

    useEffect(()=>{
        getTopics().then(response => {
            setTopics(response.topics)
        })
    }, [])

    return(<><h1>Topics</h1>
        <div id="create-new-topic">
            <button id='create-new-topic-button' onClick={handleClickNewTopic}>+ New Topic</button>
            <form id="form-new-topic" onSubmit={handleSubmitNewTopic} style={{display: 'none'}}>
                <input type="text" placeholder="Enter a new topic name" value={newTopic} onChange={({target})=>setNewTopic(target.value)} required/>
                <button type="submit">Create a New Topic</button>
            </form>
        </div>  
        {topics.map((topic, index) => {
            const {_id, name, createdBy, createdAt, username} = topic
            return <Topic id={_id} name={name} createdBy={createdBy} userId={userId} date={createdAt} username={username} key={index}/> 
        }).reverse()}
    </>)
}