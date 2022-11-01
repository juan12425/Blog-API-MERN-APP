import { Link } from "react-router-dom";
import './navbar.css'

export function Navbar(){
    return(
        <div id="navbar">
            <ul>
                <li><Link to="/" className="link-nav">Home</Link></li>
                <li><Link to="/register" className="link-nav">Register</Link></li>
                <li><Link to="/login" className="link-nav">Login</Link></li>
            </ul>
        </div>   
    )
}