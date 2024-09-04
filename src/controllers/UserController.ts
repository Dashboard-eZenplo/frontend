import api from '../services/ApiService';

class UserController {
    // Método assíncrono para obter um usuário pelo seu ID
    async getUser(userId: string | undefined) {
        try {
            const response = await api.get(`/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async updateUser(userId: string, userData: string) { //Modificar tipo user data
        try {
            const response = await api.put(`/user/edit/${userId}`, ); //Colocar o corpo da requisição
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar o usuário:', error);
            throw error;
        }
    }

    // Método assíncrono para criar um novo usuário com os dados fornecidos
    async createUser(userData: string) { //Modificar tipo user data
        try {
            // Usa o método 'post' da instância 'api' para fazer uma requisição HTTP POST,
            // enviando 'userData' como o corpo da requisição
            const response = await api.post('/user/', ); //Colocar o corpo da requisição

            // Retorna os dados obtidos na resposta da requisição, que geralmente inclui
            // os dados do usuário criado (garantir que está correto)

            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    // Método assíncrono para criar um novo usuário com os dados fornecidos
    async authenticateUser(authData: string) { //Modificar tipo  authData
        try {
            const response = await api.post('user/login/', ); //Colocar o corpo da requisição

            return response.data;
        } catch (error) {
            throw new Error('Erro ao autenticar usuário');
        }
    }
}

export default new UserController();
