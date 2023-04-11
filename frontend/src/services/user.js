import api from './axiosClient.js';

export const user = {async getAll() {
	const {data} = await api.get('/users');
	return data;
},
};
