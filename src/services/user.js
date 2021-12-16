import axios from "axios";


/* const baseUrl = 'https://myloginapi.herokuapp.com/api' */
const baseUrl = 'http://localhost:3050/api'

let token = null;

const setToken = newToken => {
    token = `Bearer ${newToken}`;
}

let config = {
    headers: {
        'Authorization': `Barer ${token}` 
    }
}


const login = async credentials => {
    const {data} = await axios.post(`${baseUrl}/login`, credentials, config);
    return data;
}

const userUpdate = async newData =>{
    const { data } = await axios.put(`${baseUrl}/users/${newData.id}`,newData, {
        headers: {
            'user-token': `${newData.x_token}`
        }
    });
    return data;
}

const userToken = async tokenData => {
    const {res} = await axios.put(`${baseUrl}/users/${tokenData.id}`,{
        x_token: tokenData.x_token,
    });
    return res;
}

const exportedObject = {
    login,
    userUpdate,
    userToken,
    setToken,
}

export default exportedObject