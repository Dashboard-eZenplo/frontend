import { useState } from 'react';
import '../../styles/App.css';
import LogotipoEzenplo from '../../assets/logo.svg';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../controllers/AuthContext';
import { AuthDTO } from '../../dtos/AuthDTO';
import api from '../../services/ApiService';

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const authData = new AuthDTO(email, password);

    try {
      const response = await api.post('user/login/', authData);
      console.log(response)
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        signIn(response.data.user);
        navigate('/register/');
      } else {
        setError('Login falhou, email ou senha incorretos.');
      }
    } catch (err) {
      console.error('Erro durante o login:', err);
      setError('Ocorreu um erro. Por favor, tente novamente.');
    }
  };

  return (
    <div className="h-screen flex w-screen flex-col md:flex-row">
      <div className="hidden md:flex w-full md:w-1/2 bg-primary items-center justify-center flex-col relative p-4">
        <div
          className="absolute inset-0 flex items-center justify-center ml-4.5 mt-4.5"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.20) 0%, transparent 60%)',
            borderRadius: '50%',
            width: '80%',
            height: '80%',
          }}
        ></div>
        <img src={LogotipoEzenplo} className="max-w-xs md:max-w-sm lg:max-h-60 relative" />
        <h1
          className="text-2xl md:text-6xl lg:text-7xl font-bold mt-6 mb-5 relative"
          style={{
            background: 'linear-gradient(90deg, #D6D2E1 0%, #FFFFFF 23%, #D5D2E5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          eZenplo
        </h1>
        <p className="text-white text-xl md:text-2xl lg:text-sm relative font-semibold">
          Você no comando do seu bem-estar.
        </p>
      </div>

      <div className="w-full md:w-1/2 h-screen flex flex-col items-center justify-center p-10">
        <h1 className="font-bold text-black mb-20">Faça login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="w-full max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <TextField
                type="email"
                label="E-mail"
                variant="standard"
                className="w-full"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <TextField
                type="password"
                label="Senha"
                variant="standard"
                className="w-full"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit" className="w-full mt-10 bg-blue-600 text-white rounded">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
