import './profile.css'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '../user/user-slice'

export function Profile(){
    const {email, username, role} = useSelector(selectUserInfo)

    return(<div id="profile">
        <ul id="profile-list">
            <li>Email: {email}</li>
            <li>Username: {username}</li>
            <li>Range: {role}</li>
        </ul>
    </div>)
}