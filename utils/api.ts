import axios from 'axios';
// refactoring: clear

const api = axios.create({
    baseURL: 'https://api.timeline.vg',
});
export default api;