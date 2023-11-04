import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.timeline.vg',
});

export default api;