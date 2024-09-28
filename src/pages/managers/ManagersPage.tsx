import { Button, Box } from '@mui/material';
import ManagersTable from '../../components/ManagersTable';
import Header from '../../components/Header';
import { defaultHeaderOptions } from '../../config/HeaderOptions';
import { useNavigate } from 'react-router-dom';

function ManagersPage() {
    const navigate = useNavigate();

    return (
        <>
            <Header headerOptions={defaultHeaderOptions.logoutOnly} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3, minHeight: '100vh' }}>

                <ManagersTable />

                <Box sx={{ marginTop: 15, textAlign: 'center' }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate('/cadastro')}>
                        Adicionar
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default ManagersPage;
