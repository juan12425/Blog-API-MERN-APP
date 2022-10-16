import './login.css'
import {useState} from 'react'

export function Login(props){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (event) => {
        const {value, name} = event.target
        
        if(name === 'email')
        {
            setEmail(value)
        }

        if(name === 'password')
        {
            setPassword(value)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        
    }

    return(<div>
        <div id="form-div" onSubmit={handleSubmit}>
            <form>
                <h1>The Tech Blog Login</h1>
                <input type="email" placeholder="Email" value={email} name="email" onChange={handleChange} required/>
                <input type="password" placeholder="Password"  value={password} name="password" onChange={handleChange} required/>
                <button type="submit">Login</button>
            </form>      
        </div>
    </div>)
}