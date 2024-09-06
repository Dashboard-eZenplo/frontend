import React from 'react';
import LogotipoEzenplo from '../assets/logo-header.png';

type HeaderOptionsType = {
  title: string;
  onclick: () => void;
  icon: React.ReactNode;
};

type HeaderProps = {
  headerOptions: HeaderOptionsType[];
};

// Exemplos de uso
// Escolha um dos exemplos e cole no arquivo que deseja utilizar o componente Header

// const headerOptions = [ /*Only Logout button*/
//   { title: '', onclick: () => { }, icon: <Logout /> }
// ];

// const headerOptions = [ /*User management and logout buttons*/
//   { title: 'Gerenciamento Usuários', onclick: () => { }, icon: <SupervisorAccountOutlined /> },
//   { title: '', onclick: () => { }, icon: <Logout /> }
// ];

// const headerOptions = [
//   { title: 'Download Modelo', onclick: () => { }, icon: <FileDownloadOutlined /> },
//   { title: 'Upload Modelo', onclick: () => { }, icon: <FileUploadOutlined /> },
//   { title: '', onclick: () => { }, icon: <Logout /> }
// ];

// Com as opções de headerOptions acima, você pode utilizar o componente Header da seguinte forma:

// <Header headerOptions={headerOptions} />

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header className="bg-white p-4 flex justify-between items-center border-b border-black">
      <img src={LogotipoEzenplo} className="w-auto h-9 ml-40" alt="Logo" />
      <nav className="flex mr-24">
        <ul className="flex">
          {props.headerOptions.map((option, index) => (
            <li
              key={index}
              className={`flex items-center ${index !== props.headerOptions.length - 1 ? 'mr-12' : 'ml-32'}`}
            >
              <a
                href="#"
                className="text-black flex items-center space-x-2"
                onClick={option.onclick}
              >
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