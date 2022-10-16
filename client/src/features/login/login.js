import './login.css'
import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {logUser, selectAuth, selectErrorMsg, resetErrorMsg} from '../user/user-slice'

export function Login(props){
    
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const errorMsg = useSelector(selectErrorMsg)
    const auth = useSelector(selectAuth)


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
        dispatch(resetErrorMsg())
        event.preventDefault()
        dispatch(logUser({email, password}))
            
    }

    return(<div>
        <div id="form-div" onSubmit={handleSubmit}>
            <form>
                <h1>The Tech Blog Login</h1>
                <input type="email" placeholder="Email" value={email} name="email" onChange={handleChange} required/>
                <input type="password" placeholder="Password"  value={password} name="password" onChange={handleChange} required/>
                <button type="submit">Login</button>
                <p id="error-msg">{errorMsg}</p>
            </form>
        </div>    
    </div>)
}