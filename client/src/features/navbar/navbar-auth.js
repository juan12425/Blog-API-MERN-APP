import { Link } from "react-router-dom";
import './navbar.css'

export function Navbar(){
    return(
        <div id="navbar">
            <ul>
                <li><Link to="/resources">Dashboard</Link></li>
                <li><Link to="/register">Profile</Link></li>
                <li><Link to="/login">Log Out</Link></li>
            </ul>
        </div>   
    )
}