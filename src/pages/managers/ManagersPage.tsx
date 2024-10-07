import { Button } from '@mui/material';
import ManagersTable from '../../components/ManagersTable';
import Header from '../../components/Header';
import { defaultHeaderOptions } from '../../config/HeaderOptions';
import { useNavigate } from 'react-router-dom';
import Background from '../../components/Background';

function ManagersPage() {
  const navigate = useNavigate();

  return (
    <Background>
      <Header headerOptions={defaultHeaderOptions.logoutOnly} />
      <div className="flex flex-col items-center p-3 min-h-screen">
        <div className="flex justify-center w-full mb-8">
          <ManagersTable />
        </div>
        <div className="mt-14 text-center">
          <Button variant="outlined" color="primary" onClick={() => navigate('/cadastro')}>
            Adicionar
          </Button>
        </div>
      </div>
    </Background>
  );
}

export default ManagersPage;
