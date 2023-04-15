import axios from 'axios';

const api = axios.create({
	baseURL: ':8000/api/v1',
});

export default api;
