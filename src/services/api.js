import axios from 'axios';

const api = axios.create({
    baseURL: 'https://bedahero1.herokuapp.com/',
})

export default api;