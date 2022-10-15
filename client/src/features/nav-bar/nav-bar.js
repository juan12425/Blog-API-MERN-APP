import { Outlet, Link } from "react-router-dom";
import './nav-bar.css'

export function NavBar(){
    return(
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="#">Login</Link></li>
            </ul>

            <Outlet />
        </div>
    )
}