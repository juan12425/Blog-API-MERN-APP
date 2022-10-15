import { NavBar } from "../navbar/navbar"
import { Outlet } from "react-router-dom";

export function Layout(){
    return(
        <div>
            <NavBar/>
            <Outlet/>
        </div>
    )
}