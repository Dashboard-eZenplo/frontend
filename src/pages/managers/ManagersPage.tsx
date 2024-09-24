import { Button, Box } from '@mui/material';
import ManagersTable from '../../components/ManagersTable';
import Header from '../../components/Header';
import { defaultHeaderOptions } from '../../config/HeaderOptions';
import { useNavigate } from 'react-router-dom';

const mockRows = [
    {
        id: 1,
        nome: 'Gerente 1',
        email: 'gerente1@empresa.com',
        cnpj: '12.345.678/0001-90',
        telefone: '(11) 1234-5678'
    },
    {
        id: 2,
        nome: 'Gerente 2',
        email: 'gerente2@empresa.com',
        cnpj: '98.765.432/0001-21',
        telefone: '(21) 9876-5432'
    },
    {
        id: 3,
        nome: 'Gerente 3',
        email: 'gerente3@empresa.com',
        cnpj: '22.333.444/0001-55',
        telefone: '(31) 3333-4444'
    },
    {
        id: 4,
        nome: 'Gerente 4',
        email: 'gerente4@empresa.com',
        cnpj: '11.222.333/0001-99',
        telefone: '(41) 1111-2222'
    },
    {
        id: 5,
        nome: 'Gerente 5',
        email: 'gerente5@empresa.com',
        cnpj: '66.777.888/0001-10',
        telefone: '(51) 5555-6666'
    }
];

function ManagersPage() {
    const navigate = useNavigate();

    return (
        <>
            <Header headerOptions={defaultHeaderOptions.logoutOnly} />
            <Box sx={{ padding: 3 }}>
                <ManagersTable rows={mockRows} />

                <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                    <Button
                        variant="contained"
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
