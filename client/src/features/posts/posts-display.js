import { NavLink } from 'react-router-dom'
import { Post } from './post/post'

export function PostsDisplay({posts, data, functions}){
    const {topicName, newPostName, newPostText, userId, relatedTopicId} = data
    const {handleClickNewPost, handleSubmitNewPost, setNewPostName, setNewPostText} = functions

    return(<>
        <h1><NavLink to='../' className="topics-link">Topics</NavLink> / {topicName}</h1>
        <div id="create-new-topic">
            <button id='create-new-topic-button' onClick={handleClickNewPost}>+ New Post</button>
            <form id="form-new-topic" onSubmit={handleSubmitNewPost} style={{display: 'none'}}>
                <input type="text" placeholder="Enter a post name" value={newPostName} onChange={({target})=>setNewPostName(target.value)} required/>
                <textarea style={{width: '90%', height: '200px'}} placeholder="Write your ideas" value={newPostText} onChange={({target})=>setNewPostText(target.value)} required/>
                <button type="submit">Create a New Post</button>
            </form>
        </div>  

        {posts.map((post, index) => {
            const {_id, name, createdBy, createdAt, username, text, isReply} = post
            if(isReply)
            {
                return null
            }
            return <Post id={_id} name={name} createdBy={createdBy} userId={userId} createdAt={createdAt} username={username} text={text} relatedTopic={relatedTopicId} key={index}/> 
        }).reverse()}
    </>)
}