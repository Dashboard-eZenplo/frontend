import LogotipoEzenplo from '../assets/logo-header.png';
import ModalLogout from './ModalLogout';

type HeaderOptionsType = {
  title: string;
  onclick: () => void;
  icon: React.ReactNode;
};

type HeaderProps = {
  headerOptions: HeaderOptionsType[];
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
};

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
                onClick={(e) => {
                  e.preventDefault();
                  if (option.title === 'Sair') {
                    props.onOpenModal();
                  } else {
                    option.onclick();
                  }
                }}
              >
                <span>{option.icon}</span>
                <span>{option.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <ModalLogout open={props.isModalOpen} onClose={props.onCloseModal} />
    </header>
  );
};

export default Header;
