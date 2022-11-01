import { useState } from "react"

export function Reply({data, updatePost, deletePost, getAndSetReplies}){
    const {userId, createdBy, role, _id, username, dateReply, text, name} = data
    const [modifying, setModifying] = useState(false)
    const [newTextReply, setNewTextReply] = useState(text)

    const handleClickModifyReply = () => {
        setModifying(true)
    }

    const handleClickDeleteReply = () => {
        deletePost(_id)
        setTimeout(getAndSetReplies, 100)
    }

    const handleSubmitModify = (event) => {
        event.preventDefault()
        updatePost(_id, name, newTextReply)
        setTimeout(getAndSetReplies, 100)
        setModifying(false)
    }

    return(<div>
        <hr className="hr-post"/>

        {!modifying && <p className="reply-text">{text}</p>}

        {(userId === createdBy || role !== 'client')  && <div> {!modifying &&
                <>
                <button className="topic-button modify" onClick={handleClickModifyReply}>modify</button>
                <button className="topic-button delete" onClick={handleClickDeleteReply}>delete</button></>}
            </div>
        }
        
        {modifying && <form id={_id} onSubmit={handleSubmitModify}>
                <textarea className="textarea-modify-post" value={newTextReply} onChange={({target}) => setNewTextReply(target.value)}/>
                <button className="modify confirm-edit" type="submit">Confirm changes</button>
            </form>
        } 
        
        <div className="reply-extra-info">
            <span>{username}</span><br/>
            <span>{dateReply}</span>
        </div>
    </div>)
}