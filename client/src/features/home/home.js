import './home.css'
import {Link} from 'react-router-dom'

export function Home(){
    return(
        <div>
            <div id="spotlight">
                <div id="blog-cover-div">
                    <img id="blog-cover" src={require('../../images/blog-cover.png')}/>
                </div>
                <div id="blog-description">
                    <p id="description-paragraph">This is The Tech Blog, a MERN web application.</p>
                    <p id="description-foot-note">- Compromised with the best user experience</p>
                </div>
            </div>
            <div id="login-reg-links">
                <Link className="link-home" to="/register">Register</Link>
                <Link className="link-home" to="/login">Login</Link>
            </div>
        </div>
    )
}
