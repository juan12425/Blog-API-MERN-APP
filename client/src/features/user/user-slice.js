import {createAsyncThunk, createSlice, createEntityAdapter} from "@reduxjs/toolkit";


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
    email: null,
    username: null,
    token: null,
    auth: false,
    errorMsg: null
}

export const logUser = createAsyncThunk('user/logUser', fetchUser)

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(logUser.fulfilled, (state, action)=>{
            const {token, email, username, msg} = action.payload
            if(token)
            {
                state.token = token
                state.auth = true
                state.email = email
                state.username = username
                
                return
            }
            
            if(msg === 'Not authorized')
            {
                state.errorMsg = 'Password is invalid'
            }
            else if(msg === 'User could not be found')
            {
                state.errorMsg = 'The user does not exist'
            }
            else{
                state.errorMsg = 'Sorry, there was an error try again later'
            }
        })
    }
})


export default userSlice.reducer