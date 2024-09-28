import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ptBR } from '@mui/x-data-grid/locales';
import { useState } from 'react';

interface Row {
  id: number;
  nome: string;
  email: string;
  cnpj: string;
  telefone: string;
}

const columns: GridColDef<Row>[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'nome',
    headerName: 'Nome',
    renderCell: (params) => (
      <Link to={`/manager/${params.row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        {params.value}
      </Link>
    ),
    width: 150,
    headerAlign: 'center',
    align: 'center',
    editable: true
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    headerAlign: 'center',
    align: 'center',
    editable: true
  },
  {
    field: 'cnpj',
    headerName: 'CNPJ',
    width: 150,
    headerAlign: 'center',
    align: 'center',
    editable: true
  },
  {
    field: 'telefone',
    headerName: 'Telefone',
    width: 150,
    headerAlign: 'center',
    align: 'center',
    editable: true
  },
  {
    field: 'delete',
    headerName: '',
    flex: 1,
    width: 1,
    headerAlign: 'right',
    align: 'right',
    renderCell: (params) => (
      <IconButton
        onClick={() => handleDelete(params.row.id)}

      >
        <DeleteOutlinedIcon />
      </IconButton>
    ),
  }
];

const handleDelete = (id: number) => {
  console.log(`Delete row with id: ${id}`);
};

interface ManagersTableProps {
  rows: Row[];
}

export default function ManagersTable({ rows }: ManagersTableProps) {
  const [quickFilterValue, setQuickFilterValue] = useState('');

  return (
    <Box sx={{ height: 680, width: '90%' }}>
      <input type='text'
        style={{
          width: '100%',
          height: '40px',
          padding: '0 10px',
          marginBottom: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}
        placeholder='Procurar'
        value={quickFilterValue}
        onChange={(e) => setQuickFilterValue(e.target.value)}
      />
      <DataGrid
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10
            }
          }
        }}
        filterModel={{
          items: [],
          quickFilterValues: [quickFilterValue],
        }}
        autoHeight
        style={{ height: '100%' }}
      />
    </Box>
  );
}
