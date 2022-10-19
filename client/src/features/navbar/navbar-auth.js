import { Link } from "react-router-dom";
import './navbar.css'

export function Navbar(){
    return(
        <div id="navbar">
            <ul>
                <li><Link to="/resources/dashboard">Dashboard</Link></li>
                <li><Link to="/resources/profile">Profile</Link></li>
                <li><Link to="/resources/log-out">Log Out</Link></li>
            </ul>
        </div>   
    )
}