import React from 'react';
import LogotipoEzenplo from '../assets/logo-header.png';

type HeaderOptionsType = {
  title: string;
  onclick: () => void;
  icon: React.ReactNode;
}

type HeaderProps = {
  headerOptions: HeaderOptionsType[];
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header className="bg-white p-4 flex justify-between items-center border-b-2 border-black">
      <img
        src={LogotipoEzenplo}
        className="w-auto h-9 ml-20"
        alt="Logo"
      />
      <nav className="flex">
        <ul className="flex space-x-8">
          {props.headerOptions.map((option, index) => (
            <li key={index} className="flex items-center">
              <a href="#" className="text-black flex items-center space-x-2" onClick={option.onclick}>
                <span>{option.icon}</span>
                <span>{option.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;