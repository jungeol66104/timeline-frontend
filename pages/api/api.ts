import axios from 'axios';

const api = axios.create({
    baseURL: 'https://spring-api.timeline.vg/v1',
});

export default api;
