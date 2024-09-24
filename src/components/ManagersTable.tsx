import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface Row {
    id: number;
    nome: string;
    email: string;
    cnpj: string;
    telefone: string;
}

const columns: GridColDef<Row>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'nome',
        headerName: 'Nome',
        width: 150,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
        editable: true,
    },
    {
        field: 'cnpj',
        headerName: 'CNPJ',
        width: 150,
        editable: true,
    },
    {
        field: 'telefone',
        headerName: 'Telefone',
        width: 150,
        editable: true,
    },
];

interface ManagersTableProps {
    rows: Row[];
}

export default function ManagersTable({ rows }: ManagersTableProps) {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}