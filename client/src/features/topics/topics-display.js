import { Topic } from "../topic/topic"

export function TopicsDisplay({topics, functions, newTopic, userId}){
    const {handleClickNewTopic, handleSubmitNewTopic, setNewTopic} = functions
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