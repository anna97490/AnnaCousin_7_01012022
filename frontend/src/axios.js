const axios = require('axios');

// Config pour les requetes API avec Axios
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default instance;
