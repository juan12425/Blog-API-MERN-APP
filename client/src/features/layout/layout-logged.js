import { Navbar } from "../navbar/navbar-auth"
import { Outlet } from "react-router-dom";
import {Footer} from '../footer/footer'

export function LayoutLogged(){
    return(
        <div>
            <Navbar />
            <Outlet/>
            <Footer />
        </div>
    )
}