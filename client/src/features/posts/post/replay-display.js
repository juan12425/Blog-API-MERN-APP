export function ReplyDisplay({data, functions}){
    const {userId, 
        createdBy, 
        role, _id, 
        username, 
        dateReply, 
        text, 
        newTextReply, 
        setNewTextReply,
        modifying} = data

    const {handleClickModifyReply, handleClickDeleteReply, handleSubmitModify} = functions

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