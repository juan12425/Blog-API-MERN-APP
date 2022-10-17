import { Navbar } from "../navbar/navbar"
import { Outlet } from "react-router-dom";
import {Footer} from '../footer/footer'

export function Layout(){
    return(
        <div>
            <Navbar/>
            <Outlet/>
            <Footer />
        </div>
    )
}