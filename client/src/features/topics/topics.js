import {useEffect} from 'react'
import { useSelector } from 'react-redux'
import {selectUserInfo} from '../user/user-slice'
import { useState } from 'react'
import {sendGet, sendPost} from '../../crud/crud'
import { TopicsDisplay } from './topics-display'

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

    return <TopicsDisplay topics={topics} 
        functions={{
            handleClickNewTopic,
            handleSubmitNewTopic,
            setNewTopic
        }}
        newTopic={newTopic}
        userId={userId}
    />
}