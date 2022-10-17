import { Navbar } from "../navbar/navbar-auth"
import { Outlet } from "react-router-dom";
import {Footer} from '../footer/footer'
import {selectAuth} from '../user/user-slice'
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export function LayoutLogged(){
    
    const auth = useSelector(selectAuth)

    return(
        <div>
            {auth || <Navigate to='/login'/>}
            <Navbar />
            <Outlet/>
            <Footer />
        </div>
    )
}