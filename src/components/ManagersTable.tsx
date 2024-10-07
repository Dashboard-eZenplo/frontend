import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Alert, IconButton, InputAdornment, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ptBR } from '@mui/x-data-grid/locales';
import { useEffect, useState } from 'react';
import { deleteManager } from '../services/managers/managerService';

interface Row {
  id: number;
  nome: string;
  email: string;
  cnpj: string;
  telefone: string;
}

export default function ManagersTable() {
  const [rows, setRows] = useState<Row[]>([
    {
      id: 1,
      nome: 'João',
      email: 'joao@gmail.com',
      cnpj: '56.669.036/0001-17',
      telefone: '(51) 123456789'
    },
    {
      id: 2,
      nome: 'Maria',
      email: 'maria@gmail.com',
      cnpj: '87.271.602/0001-61',
      telefone: '(51) 987654321'
    }
  ]);

  const [quickFilterValue, setQuickFilterValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const columns: GridColDef<Row>[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      headerAlign: 'center',
      align: 'center'
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
      editable: false
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      editable: false
    },
    {
      field: 'cnpj',
      headerName: 'CNPJ',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      editable: false
    },
    {
      field: 'telefone',
      headerName: 'Telefone',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      editable: false
    },
    {
      field: 'delete',
      headerName: '',
      flex: 1,
      width: 1,
      headerAlign: 'right',
      align: 'right',
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.row.id)}>
          <DeleteOutlinedIcon />
        </IconButton>
      )
    }
  ];

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        // const data = await getManagers();
        setRows(rows);
      } catch (error: any) {
        console.error('Error fetching managers:', error);
        setRows([]);
      }
    };

    fetchManagers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteManager(id);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="h-[631px] w-[90%]">
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        placeholder="Busque pelo e-mail da empresa"
        variant="standard"
        value={quickFilterValue}
        onChange={(e) => setQuickFilterValue(e.target.value)}
        sx={{ marginBottom: 2, width: '26%' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          )
        }}
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
          quickFilterValues: [quickFilterValue]
        }}
        autoHeight
        style={{ height: '100%' }}
        className="bg-white"
      />
    </div>
  );
}
