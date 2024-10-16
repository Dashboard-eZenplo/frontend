import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Alert, Box, Button, IconButton, InputAdornment, Modal, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ptBR } from '@mui/x-data-grid/locales';
import { useEffect, useState } from 'react';
import { deleteEmployee } from '../services/employees/employeeService';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import UploadDownloadBox from './UploadDownloadBox';
interface Row {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  departamento: string;
  dataDeAdmissao: string;
  dataDeAniversario: string;
}

export default function EmployeesTable() {
  const [rows, setRows] = useState<Row[]>([
    {
      id: 1,
      nome: 'João',
      email: 'joao@gmail.com',
      cargo: 'Desenvolvedor',
      departamento: 'TI',
      dataDeAdmissao: '2021-10-01',
      dataDeAniversario: '1990-01-01'
    },
    {
      id: 2,
      nome: 'Maria',
      email: 'maria@gmail.com',
      cargo: 'Gerente',
      departamento: 'Administração',
      dataDeAdmissao: '2021-10-01',
      dataDeAniversario: '1990-01-01'
    },
    {
      id: 3,
      nome: 'Thiagp',
      email: 'thiago@gmail.com',
      cargo: 'Motorista',
      departamento: 'Transporte',
      dataDeAdmissao: '2021-10-01',
      dataDeAniversario: '1980-01-01'
    },
    {
      id: 4,
      nome: 'Gabriela',
      email: 'gabriela@gmail.com',
      cargo: 'Gerente',
      departamento: 'Administração',
      dataDeAdmissao: '2021-10-01',
      dataDeAniversario: '1990-01-01'
    }
  ]);

  const [quickFilterValue, setQuickFilterValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const columns: GridColDef<Row>[] = [
    // {
    //     field: 'id',
    //     headerName: 'ID',
    //     width: 90,
    //     headerAlign: 'center',
    //     align: 'center'
    // },
    {
      field: 'nome',
      headerName: 'Nome',
      renderCell: (params) => (
        <Link
          to={`/employee/${params.row.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
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
      field: 'cargo',
      headerName: 'Cargo',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      editable: false
    },
    {
      field: 'departamento',
      headerName: 'Departamento',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      editable: false
    },
    {
      field: 'dataDeAdmissao',
      headerName: 'Data de admissão',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      editable: false
    },
    {
      field: 'dataDeAniversario',
      headerName: 'Data de aniversário',
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
    const fetchEmployees = async () => {
      try {
        setRows(rows);
      } catch (error: any) {
        console.error('Error fetching employees:', error);
        setRows([]);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteEmployee(id);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="h-[631px] w-[90%]">
      {error && <Alert severity="error">{error}</Alert>}

      <div className="flex justify-between items-center mb-4">
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
        <div className="flex space-x-4">
          <Button
            startIcon={<FileUploadOutlinedIcon sx={{ fontSize: 20 }} />}
            onClick={handleOpenModal}
            sx={{
              width: '70%',
              padding: 0,
              textTransform: 'none',
              color: 'black',
              fontSize: '0.875rem',
              backgroundColor: 'transparent',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                boxShadow: 'none'
              }
            }}
          >
            Upload Modelo
          </Button>
          <Button
            startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 20 }} />}
            sx={{
              width: '70%',
              padding: 0,
              textTransform: 'none',
              color: 'black',
              fontSize: '0.875rem',
              backgroundColor: 'transparent',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                boxShadow: 'none'
              }
            }}
          >
            Download Modelo
          </Button>
        </div>
      </div>
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
      <Modal open={open} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(0.8)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            outline: 0
          }}
        >
          <UploadDownloadBox />
        </Box>
      </Modal>
    </div>
  );
}
