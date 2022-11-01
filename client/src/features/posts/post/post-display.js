import { Reply } from "./reply"
export function PostDisplay({replies, data, functions}){
    const {modifying, 
        newName, 
        username,
        date,
        id, 
        userId, 
        createdBy, 
        role, 
        text,
        name,
        newText,
        } = data

    const {handleSubmitModify, 
        setNewName, 
        handleClickPostTitle, 
        handleClickModify, 
        handleClickDelete, 
        setNewText, 
        updatePost,
        deletePost,
        getAndSetReplies,
        handleSubmitReply,
        replyText,
        handleChangeReplyText,
        handleDisplayFormReply
        } = functions

    return(<div className="topic">
        {modifying ? 
            <form onSubmit={handleSubmitModify}> 
                <input className="modify-input" type="text" value={newName} onChange={({target})=> setNewName(target.value)} placeholder="New name" required/>
                <button className="modify confirm-edit" type="submit">Confirm changes</button>
            </form> : 
        <button className="links-topics-posts cursor-pointer display-post-link" onClick={()=>handleClickPostTitle(id)}>{name}</button>}
        
        <p>{username}</p>
        <p>{date}</p>

        <div id={id} className="post-info">
            {(userId === createdBy || role !== 'client') && (<div>
                {modifying === false && <><button className="topic-button modify" onClick={handleClickModify}>modify</button>
                <button className="topic-button delete" onClick={handleClickDelete}>delete</button></>}
            </div>)}
            <hr className="hr-post"/>
            {modifying ? 
                <form onSubmit={handleSubmitModify}>
                    <textarea className="textarea-modify-post" value={newText} onChange={({target}) => setNewText(target.value)}/>
                </form> :
                
                <div className="post-inner-text">
                    <p className="post-text-first">{text}</p>
                </div>
            }

            <div>
                {replies.map((reply, index) => {
                    const {text, username, createdAt, _id, name} = reply
                    const dateReply = (new Date(createdAt)).toDateString()
                    const data = {
                        userId, 
                        createdBy, 
                        role, 
                        _id, 
                        username, 
                        dateReply, 
                        text,
                        name
                    }
                    return <Reply key={index} data={data} updatePost={updatePost} deletePost={deletePost} getAndSetReplies={getAndSetReplies}/>
                })}

                <div>
                    <button className="add-reply-button" onClick={() => handleDisplayFormReply(`${id}-form`)}>+ Add Reply</button>
                    <form id={`${id}-form`} className="reply-form" onSubmit={handleSubmitReply}>
                        <textarea className="textarea-reply" value={replyText} onChange={handleChangeReplyText}/>
                        <button className="modify confirm-edit" type="submit">Add reply</button>
                    </form>
                </div>
            </div>        
        </div>
    </div>)
}