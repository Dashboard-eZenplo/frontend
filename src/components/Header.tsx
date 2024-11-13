import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogotipoEzenplo from '../assets/logo-header.png';
import ModalComponent from './ModalComponent';
import { Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

type HeaderOptionsType = {
  title: string;
  to: string;
  icon: React.ReactNode;
};

type HeaderProps = {
  headerOptions: HeaderOptionsType[];
};

const Header: React.FC<HeaderProps> = ({ headerOptions }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogoutClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setLogoutModalOpen(true);
  };

  const closeModal = () => {
    setLogoutModalOpen(false);
  };

  if (isMobile) return null;

  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-zinc-300">
      <img src={LogotipoEzenplo} className="w-auto ml-24 h-9" alt="LogotipoEzenplo" />
      <nav className="flex mr-24">
        <ul className="flex">
          {headerOptions.map(({ title, to, icon }, index) => (
            <li
              key={index}
              className={`flex items-center ${index !== headerOptions.length - 1 ? 'mr-12' : 'ml-32'}`}
            >
              {to === '/logout' ? (
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center space-x-2 text-zinc-800"
                  style={{ backgroundColor: 'transparent', border: 'none' }}
                >
                  <span>{icon}</span>
                  <span>{title}</span>
                </button>
              ) : (
                <Link
                  to={to.startsWith('/') ? to : `/${to}`}
                  className="flex items-center space-x-2 text-zinc-800"
                >
                  <span>{icon}</span>
                  <span>{title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {isLogoutModalOpen && (
        <ModalComponent
          open={isLogoutModalOpen}
          onClose={closeModal}
          title="CONFIRMAR SAÍDA"
          description="Você tem certeza que deseja sair de sua conta?"
        >
          <>
            <Button
              onClick={() => {
                handleLogout();
                closeModal();
              }}
              fullWidth
              sx={{
                minWidth: {
                  xs: '100px',
                  sm: '120px',
                  md: '140px'
                },
                height: {
                  xs: '30px',
                  sm: '40px',
                  md: '45px'
                },
                borderRadius: '8px',
                border: '2px solid blue',
                backgroundColor: '#ffffff',
                textTransform: 'none',
                fontSize: {
                  xs: '12px',
                  sm: '14px',
                  md: '16px'
                }
              }}
            >
              Sair
            </Button>
            <Button
              onClick={closeModal}
              fullWidth
              sx={{
                minWidth: {
                  xs: '100px',
                  sm: '120px',
                  md: '140px'
                },
                height: {
                  xs: '30px',
                  sm: '40px',
                  md: '45px'
                },
                borderRadius: '8px',
                border: '2px solid black',
                backgroundColor: '#ffffff',
                color: '#000000',
                textTransform: 'none',
                fontSize: {
                  xs: '12px',
                  sm: '14px',
                  md: '16px'
                }
              }}
            >
              Cancelar
            </Button>
          </>
        </ModalComponent>
      )}
    </header>
  );
};

export default Header;
