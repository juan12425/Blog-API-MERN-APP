import './dashboard.css'
import { Outlet } from "react-router-dom";

export function Dashboard(){
    return(<div id="dash">
        <Outlet />
    </div>)
}
