import { Link } from "react-router-dom";
import './navbar.css'

export function Navbar(){
    return(
        <div id="navbar">
            <ul>
                <li><Link to="/resources/dashboard" className="link-nav">Dashboard</Link></li>
                <li><Link to="/resources/profile" className="link-nav">Profile</Link></li>
                <li><Link to="/resources/log-out" className="link-nav">Log Out</Link></li>
            </ul>
        </div>   
    )
}