import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogotipoEzenplo from '../assets/logo-header.png';

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

  if (isMobile) return null;

  return (
    <header className="bg-white p-4 flex justify-between items-center border-b border-zinc-300">
      <img src={LogotipoEzenplo} className="w-auto h-9 ml-24" alt="LogotipoEzenplo" />
      <nav className="flex mr-24">
        <ul className="flex">
          {headerOptions.map(({ title, to, icon }, index) => (
            <li
              key={index}
              className={`flex items-center ${index !== headerOptions.length - 1 ? 'mr-12' : 'ml-32'}`}
            >
              <Link
                to={to.startsWith('/') ? to : `/${to}`}
                className="text-zinc-800 flex items-center space-x-2"
              >
                <span>{icon}</span>
                <span>{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
