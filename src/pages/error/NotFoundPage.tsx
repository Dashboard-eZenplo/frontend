import { Link } from 'react-router-dom';
import LogotipoEzenplo from '../../assets/logo.svg';

const NotFoundPage: React.FC = () => {
  return (
    <div className="h-screen flex w-screen flex-row">
      <div className="flex w-full bg-primary items-center justify-center flex-col relative p-4">
        <div
          className="flex flex-col items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.20) 0%, transparent 60%)',
            borderRadius: '50%',
            width: '80%',
            height: '80%'
          }}
        >
          <img
            src={LogotipoEzenplo}
            className="max-w-xs md:max-w-sm lg:max-h-60 relative "
            alt="Logotipo da eZenplo"
          />
          <h1
            className="h-12 text-xl font-bold mt-6 mb-5 relative"
            style={{
              background: 'linear-gradient(90deg, #D6D2E1 0%, #FFFFFF 23%, #D5D2E5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Esta página não existe
          </h1>
          <h2>
            Por favor clique{' '}
            <Link className="text-inherit hover:text-complementary-secondary" to={'/'}>
              aqui
            </Link>{' '}
            para retornar à página inicial
          </h2>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
