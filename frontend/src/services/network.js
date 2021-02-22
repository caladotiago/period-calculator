import axios from 'axios';
import isDev from '../utilities/envChecker';

const network = axios.create({
    baseURL: isDev ? 'http://localhost:3333' : '/',
});

export default network;
