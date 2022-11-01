import {store} from '../app/store'
import { logOut } from '../features/user/user-slice'

const checkAuth =  (response) => {
    const msg = response.msg
    if(msg === 'Authentication invalid')
    {
        store.dispatch(logOut())
    }
}

async function request(route, headers, method, params='', query='', body={}){
    try{
        const endpoint = `/api/v1/${route}/${params}?${query}`  
        let httpContent;

        if(method === 'GET')
        {
            httpContent = {
                method,
                headers
            }
        }
        else{
            httpContent = {
                method,
                headers,
                body: JSON.stringify(body)
            }
        }

        const response = await fetch(endpoint, httpContent)
        const data = await response.json()
        checkAuth(data)
        return data
        

    }catch(error){
        console.log(error)
    }
}

export async function sendGet(route, params, query, token=''){
    const method = 'GET'
    const headers = {
        Authorization: `Bearer ${token}`
    }
    const response = await request(route, headers, method, params, query)
    return response
}

export async function sendPost(route, params, query, body={}, token=''){
    const method = 'POST'
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
    const response = await request(route, headers, method, params, query, body)
    return response
}

export async function sendUpdate(route, params, query, body={}, token=''){
    const method = 'PATCH'
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
    const response = await request(route, headers, method, params, query, body)
    return response
}

export async function sendDelete(route, params, query, token=''){
    const method = 'DELETE'
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
    const response = await request(route, headers, method, params, query)
    return response
}
