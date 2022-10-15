import { Link } from "react-router-dom";
import './navbar.css'

export function NavBar(){
    return(
        <div id="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </div>   
    )
}