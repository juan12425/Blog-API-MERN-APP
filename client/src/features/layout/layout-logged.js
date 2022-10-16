import { NavBar } from "../navbar/navbar"
import { Outlet } from "react-router-dom";
import {Footer} from '../footer/footer'

export function LayoutLogged(){
    return(
        <div>
            <p>Welcome to Layout logged</p>
            <Outlet/>
            <Footer />
        </div>
    )
}