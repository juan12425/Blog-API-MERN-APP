import { Navigate } from "react-router"
import {logOut} from '../user/user-slice'
import { useDispatch } from "react-redux"

export function LogOut(){
    const dispatch = useDispatch()
    dispatch(logOut())    
    
    return(<>
        <Navigate to="/login" />
    </>)
}
