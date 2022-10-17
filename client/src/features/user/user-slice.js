import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const fetchUser = async  ({email, password}) => {
    try{
        const response = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email,
                password
            })
        })
        
        return await response.json()
        
    }catch(error)
    {
        console.log(error)
    }
}

const createUser = async ({name, email, username, password}) => {
    try{
        const response = await fetch('/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                username,
                password
            })
        })
        
        return await response.json()
        
    }catch(error)
    {
        console.log(error)
    }
}

const initialState = {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {
        email: null,
        username: null,
        role: null,
        token: null
    },
    auth: JSON.parse(localStorage.getItem('auth')) || false,
    errorMsg: localStorage.getItem('errorMsg') || null,
    errorMsgRegister: localStorage.getItem('errorMsgRegister') || null

}

export const logUser = createAsyncThunk('user/logUser', fetchUser)
export const registerUser = createAsyncThunk('user/register', createUser)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        resetErrorMsg: (state, action) => {
            state.errorMsg = null
        },
        resetErrorMsgRegister: (state, action) => {
            state.errorMsgRegister = null
        },
        logOut: (state, action) => {
            
            localStorage.removeItem('userInfo', null)
            localStorage.removeItem('auth', false)
            localStorage.removeItem('errorMsg', null)
            localStorage.removeItem('errorMsgRegister', null)
            
            state.userInfo = {email: null,
                username: null,
                role: null,
                token: null}

            state.auth = false
            state.errorMsg = null
            state.errorMsgRegister = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logUser.fulfilled, (state, action)=>{
            const {token, email, username, role, msg} = action.payload
            if(token)
            {
                state.userInfo = {
                    email, username, token, role
                }
                state.auth = true

                localStorage.setItem('userInfo', JSON.stringify({
                    email,
                    username,
                    token,
                    role
                }))

                localStorage.setItem('auth', true)
                
                return
            }
            
            if(msg === 'Not authorized')
            {
                state.errorMsg = 'Password is invalid'
                localStorage.setItem('errorMsg', 'Password is invalid')
            }
            else if(msg === 'User could not be found')
            {
                state.errorMsg = 'The user does not exist'
                localStorage.setItem('errorMsg', 'The user does not exist')
            }
            else{
                state.errorMsg = 'Sorry, there was an error try again later'
                localStorage.setItem('errorMsg', 'Sorry, there was an error try again later')
            }

        }).addCase(registerUser.fulfilled, (state,action) => {
            const {token, email, username, role, msg} = action.payload

            if(token)
            {
                state.userInfo = {
                    email, username, token, role
                }
                state.auth = true

                localStorage.setItem('userInfo', JSON.stringify({
                    email,
                    username,
                    token,
                    role
                }))

                localStorage.setItem('auth', JSON.stringify(true))
                
                return
            }

            state.errorMsgRegister = msg
            localStorage.setItem('errorMsgRegister', msg)
        })
    }
})

export const selectErrorMsg = (state) => state.user.errorMsg 

export const selectUserInfo = (state) => state.user.userInfo

export const selectAuth = (state) => state.user.auth

export const selectErrorMsgRegister = (state) => state.user.errorMsgRegister


export const {resetErrorMsg, resetErrorMsgRegister, logOut} = userSlice.actions

export default userSlice.reducer