import axios from 'axios';
// refactoring: clear

const api = axios.create({
    baseURL: 'https://spring-api.timeline.vg/v1',
});
export default api;