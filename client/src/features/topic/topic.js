import './topic.css'

export function Topic(props){
    const {id, name, createdBy} = props 
    return(<div className="topic">
            <h2>{name}</h2>
        </div>)
}