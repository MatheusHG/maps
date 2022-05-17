import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.pilab.com.br/',
});

export default api;
