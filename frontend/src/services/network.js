import axios from 'axios';

const network = axios.create({
    baseURL: 'http://localhost:3333',
});

export default network;
