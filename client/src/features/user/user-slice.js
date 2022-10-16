import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const fetchUser = async  ({email, password}) => {
    try{
        const response = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "email": email,
                "password": password
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
        token: null
    },
    auth: localStorage.getItem('auth') || false,
    errorMsg: localStorage.getItem('errorMsg') || null
}

export const logUser = createAsyncThunk('user/logUser', fetchUser)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        resetErrorMsg: (state, action) => {
            state.errorMsg = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logUser.fulfilled, (state, action)=>{
            const {token, email, username, msg} = action.payload
            if(token)
            {
                state.userInfo = {
                    email, username, token
                }
                state.auth = true

                localStorage.setItem('userInfo', JSON.stringify({
                    email,
                    username,
                    token
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
        })
    }
})

export const selectErrorMsg = (state) => {
    return state.user.errorMsg 
}

export const selectUserInfo = (state) => {
    return state.user.userInfo
}

export const selectAuth = (state) => {
    return state.user.auth
}

export const {resetErrorMsg} = userSlice.actions

export default userSlice.reducer