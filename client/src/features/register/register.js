import '../login/login.css';
import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {registerUser, selectAuth, selectErrorMsgRegister, resetErrorMsgRegister} from '../user/user-slice'
import { Navigate } from 'react-router-dom';

export function Register(){
    
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [name, setName] = useState('')
    const [pwdError, setPwdError] = useState('')
    const errorMsg = useSelector(selectErrorMsgRegister)
    const auth = useSelector(selectAuth)


    const handleSubmit = (event) => {
        dispatch(resetErrorMsgRegister())
        setPwdError('')
        event.preventDefault()
        if(password !== repeatedPassword){
            setPwdError('Passwords must match')
            return
        }else if(password.length < 6)
        {
            setPwdError('Password must contain at least 6 characters')
            return
        }

        dispatch(registerUser({name, email, username, password}))
    }

    const handleChange = (event) => {
        const {value, name} = event.target
        
        switch(name){
            case 'name': setName(value)
                break
            case 'email': setEmail(value)
                break
            case 'username': setUsername(value)
                break
            case 'repeated-password': setRepeatedPassword(value)
                break
            case 'password': setPassword(value)
                break
            default: break
        }
       
    }

    return(<div>
        <div id="form-div">
            {auth && <Navigate to="/resources/dashboard" />}
            <form onSubmit={handleSubmit}>
                <h1>The Tech Blog Sign Up</h1>
                <input type="text" placeholder="Name" value={name} name="name" onChange={handleChange} required/>
                <input type="email" placeholder="Email" value={email} name="email" onChange={handleChange} required/>
                <input type="text" placeholder="Username" value={username} name="username" onChange={handleChange} required/>
                <input type="password" placeholder="Password"  value={password} name="password" onChange={handleChange} required/>
                <input type="password" placeholder="Repeat password"  value={repeatedPassword} name="repeated-password" onChange={handleChange} required/>
                <button type="submit">Login</button>
                <p id="error-msg">{errorMsg}</p>
                <p>{pwdError}</p>
            </form>
        </div>    
    </div>)
}