import axios, { AxiosInstance } from 'axios';

class ApiService {
	private api: AxiosInstance;

	constructor() {
		this.api = axios.create({
			baseURL: 'http://localhost:8000', // Trocar para o IP do servidor
			timeout: 30000, // Define um timeout para as requisições
		});

		// Interceptor de respostas para tratar erros globalmente
		 this.api.interceptors.response.use(
		 	(response) => response,
		 	(error) => {
		 		console.error('Código Erro:', error);
		 		console.error('Erro na requisição:', error.response?.data);
		 		return Promise.reject(error);
		 	}
		 );
        
	}

	public get(url: string, params?: object) {
		return this.api.get(url, { params });
	}

	public post(url: string, data?: object) {
		return this.api.post(url, data);
	}

	public put(url: string, data?: object) {
		return this.api.put(url, data);
	}

	public delete(url: string) {
		return this.api.delete(url);
	}
}

export default new ApiService();
