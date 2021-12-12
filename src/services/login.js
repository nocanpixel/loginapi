import axios from "axios";


const baseUrl = 'https://myloginapi.herokuapp.com/api'

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
    const {data} = await axios.post(`${baseUrl}/users/login`, credentials, config);
    return data
}

const userToken = async tokenData => {
    const {res} = await axios.put(`${baseUrl}/users/${tokenData.id}`,{
        x_token: tokenData.x_token,
    });
    return res;
}

export default {login, userToken, setToken}