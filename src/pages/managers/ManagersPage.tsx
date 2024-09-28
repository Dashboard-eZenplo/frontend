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
    ,
    {
        id: 6,
        nome: 'Gerente 6',
        email: 'gerente6@empresa.com',
        cnpj: '77.888.999/0001-11',
        telefone: '(61) 6666-7777'
    },
    {
        id: 7,
        nome: 'Gerente 7',
        email: 'gerente7@empresa.com',
        cnpj: '88.999.000/0001-22',
        telefone: '(71) 7777-8888'
    },
    {
        id: 8,
        nome: 'Gerente 8',
        email: 'gerente8@empresa.com',
        cnpj: '99.000.111/0001-33',
        telefone: '(81) 8888-9999'
    },
    {
        id: 9,
        nome: 'Gerente 9',
        email: 'gerente9@empresa.com',
        cnpj: '00.111.222/0001-44',
        telefone: '(91) 9999-0000'
    },
    {
        id: 10,
        nome: 'Gerente 10',
        email: 'gerente10@empresa.com',
        cnpj: '11.222.333/0001-55',
        telefone: '(11) 0000-1111'
    },
    {
        id: 11,
        nome: 'Gerente 11',
        email: 'gerente11@empresa.com',
        cnpj: '22.333.444/0001-66',
        telefone: '(21) 1111-2222'
    },
    {
        id: 12,
        nome: 'Gerente 12',
        email: 'gerente12@empresa.com',
        cnpj: '33.444.555/0001-77',
        telefone: '(31) 2222-3333'
    },
    {
        id: 13,
        nome: 'Gerente 13',
        email: 'gerente13@empresa.com',
        cnpj: '44.555.666/0001-88',
        telefone: '(41) 3333-4444'
    },
    {
        id: 14,
        nome: 'Gerente 14',
        email: 'gerente14@empresa.com',
        cnpj: '55.666.777/0001-99',
        telefone: '(51) 4444-5555'
    },
    {
        id: 15,
        nome: 'Gerente 15',
        email: 'gerente15@empresa.com',
        cnpj: '66.777.888/0001-00',
        telefone: '(61) 5555-6666'
    },
    {
        id: 16,
        nome: 'Gerente 16',
        email: 'gerente16@empresa.com',
        cnpj: '77.888.999/0001-11',
        telefone: '(71) 6666-7777'
    },
    {
        id: 17,
        nome: 'Gerente 17',
        email: 'gerente17@empresa.com',
        cnpj: '88.999.000/0001-22',
        telefone: '(81) 7777-8888'
    },
    {
        id: 18,
        nome: 'Gerente 18',
        email: 'gerente18@empresa.com',
        cnpj: '99.000.111/0001-33',
        telefone: '(91) 8888-9999'
    },
    {
        id: 19,
        nome: 'Gerente 19',
        email: 'gerente19@empresa.com',
        cnpj: '00.111.222/0001-44',
        telefone: '(11) 9999-0000'
    },
    {
        id: 20,
        nome: 'Gerente 20',
        email: 'gerente20@empresa.com',
        cnpj: '11.222.333/0001-55',
        telefone: '(21) 0000-1111'
    }
];

function ManagersPage() {
    const navigate = useNavigate();

    return (
        <>
            <Header headerOptions={defaultHeaderOptions.logoutOnly} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>

                <ManagersTable rows={mockRows} />


                <Box sx={{ marginTop: '64px', textAlign: 'center' }}>
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
