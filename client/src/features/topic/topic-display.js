import { Link } from "react-router-dom"
export function TopicDisplay({data, functions}){
    const {modifying, newName, id, name, username, formatedDate, userId, createdBy, role} = data
    const {handleSubmitModify, setNewName, handleClickModify, handleClickDelete} = functions
    return(<div className="topic">
        {modifying ? 
            <form onSubmit={handleSubmitModify}> 
                <input className="modify-input" type="text" value={newName} onChange={({target})=> setNewName(target.value)} placeholder="New name" required/>
                <button className="modify confirm-edit" type="submit">Confirm changes</button>
            </form> : 
        <h2><Link className="links-topics-posts" to={`/resources/dashboard/posts?topic=${id}&topicname=${name}`}>{name}</Link></h2>}
        <p>{username}</p>
        <p>{formatedDate}</p>
        {(userId === createdBy || role !== 'client') && (<div>
            {modifying === false && <><button className="topic-button modify" onClick={handleClickModify}>modify</button>
            <button className="topic-button delete" onClick={handleClickDelete}>delete</button></>}
        </div>)}
    </div>)
}