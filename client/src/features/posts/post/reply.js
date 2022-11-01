import { useState } from "react"
import { ReplyDisplay } from "./replay-display"

export function Reply({data, updatePost, deletePost, getAndSetReplies}){
    const {_id, text, name} = data
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

    return <ReplyDisplay 
        data={{...data,
             newTextReply, 
             setNewTextReply, 
             modifying}} 
        
        functions={{handleClickModifyReply,
        handleClickDeleteReply,
        handleSubmitModify }}/>
}