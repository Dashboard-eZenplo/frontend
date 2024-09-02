import '../styles/App.css';
import logo from '../assets/logo.svg';

function LoginPage() {
    return (
        <div className='h-screen flex w-screen'>
            {/* Coluna da esquerda */}
            <div className='w-1/2 bg-blue-600 flex items-center justify-center'>
                <img src={logo} className='max-w-xs' />
            </div>

            {/* Coluna da direita */}
            <div className='w-1/2 h-screen flex flex-col items-center justify-center p-10'>
                <h1 className='font-bold mb-20'>Faça Login</h1>
                <div className='w-full max-w-sm'>
                    <form className='space-y-6'>
                        <div className='relative'>
                            <label htmlFor='email' className='text-gray-500 mb-2 block'>
                                Email
                            </label>
                            <input
                                type='email'
                                id='email'
                                className='w-full border-b-2 border-gray-300 bg-transparent mb-7 focus:outline-none focus:border-blue-600 transition-colors'
                                placeholder='Digite seu email'
                            />
                        </div>
                        <div className='relative'>
                            <label htmlFor='senha' className='text-gray-500 mb-1   block'>
                                Senha
                            </label>
                            <input
                                type='password'
                                id='senha'
                                className='w-full border-b-2 border-gray-300 bg-transparent mb-20 focus:outline-none focus:border-blue-600 transition-colors'
                                placeholder='Digite sua senha'
                            />
                        </div>
                        <button
                            type='submit'
                            className='w-full py-2 mt-10 bg-blue-600 text-white rounded'
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;