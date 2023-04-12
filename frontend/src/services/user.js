import api from './axiosClient.js';

export const user = {
	async getAll() {
		const {data} = await api.get('/users');
		return data;
	},
	async createOne({name, password}) {
		const {data} = await api.post('/users', {name, password});
		return data;
	},
	async signInAccount({name, password}) {
		const {data} = await api.post('/sign/in', {name, password});
		return data;
	},
};
