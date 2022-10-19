
async function request(route, headers, method, params='', query='', body={}){
    try{
        const endpoint = `/api/v1/${route}/${params}?${query}`  
        
        if(method === 'GET')
        {
            const response = await fetch(endpoint, {
                method,
                headers
            })
            const data = await response.json()
            return data
        }

        const response = await fetch(endpoint, {
            method,
            headers,
            body: JSON.stringify(body)
        })
        const data = await response.json()
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
