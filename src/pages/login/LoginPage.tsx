import '../../styles/App.css';
import logo from '../../assets/logo.svg';
import { TextField } from '@mui/material';

function LoginPage() {
    return (
        <div className='h-screen flex w-screen'>
            {/* Coluna da esquerda */}
            <div className='w-1/2 bg-blue-600 flex items-center justify-center flex-col relative'>
                <div
                    className='absolute inset-0 flex items-center justify-center ml-4.5 mt-4.5'
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, transparent 60%)',
                        borderRadius: '50%',
                        width: '80%',
                        height: '80%',
                    }}
                ></div>
                <img src={logo} className='max-w-xs relative' />
                <h1
                    className='text-8xl font-bold mt-6 mb-5 relative'
                    style={{
                        background: 'linear-gradient(90deg, #D6D2E1 0%, #FFFFFF 23%, #D5D2E5 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    eZenplo
                </h1>
                <h1 className='text-white text-2xl relative font-bold'>
                    Você no comando do seu bem-estar.
                </h1>
            </div>


            {/* Coluna da direita */}
            <div className='w-1/2 h-screen flex flex-col items-center justify-center p-10'>
                <h1 className='font-bold mb-20'>Faça Login</h1>
                <div className='w-full max-w-sm'>
                    <form className='space-y-6  '>
                        <div className='relative'>
                            <TextField
                                type='email'
                                label="E-mail"
                                variant="standard"
                                className="w-full"
                                placeholder="Digite seu e-mail"
                                required
                            />
                        </div>
                        <div className='relative'>
                            <TextField
                                type='password'
                                label="Senha"
                                variant="standard"
                                className="w-full"
                                placeholder="Digite sua senha"
                                required
                            />
                        </div>
                        <div className=''>
                            <button
                                type='submit'
                                className='w-full mt-10 bg-blue-600 text-white rounded'
                            >
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