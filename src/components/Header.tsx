import React from 'react';
import { Link } from 'react-router-dom';
import LogotipoEzenplo from '../assets/logo-header.png';

type HeaderOptionsType = {
  title: string;
  to: string;
  icon: React.ReactNode;
};

type HeaderProps = {
  headerOptions: HeaderOptionsType[];
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
};

function Header({ headerOptions }: HeaderProps) {
  return (
    <header className="bg-white p-4 flex justify-between items-center border-b border-black">
      <img src={LogotipoEzenplo} className="w-auto h-9 ml-40" alt="LogotipoEzenplo" />
      <nav className="flex mr-24">
        <ul className="flex">
          {headerOptions.map(({ title, to, icon }, index) => (
            <li
              key={index}
              className={`flex items-center ${index !== headerOptions.length - 1 ? 'mr-12' : 'ml-32'}`}
            >
              <Link to={to.startsWith('/') ? to : `/${to}`} className="text-black flex items-center space-x-2">
                <span>{icon}</span>
                <span>{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
