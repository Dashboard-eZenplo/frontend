import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  Snackbar,
  TextField
} from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ptBR } from '@mui/x-data-grid/locales';
import { useEffect, useState } from 'react';
import { deleteEmployee, getEmployees } from '../services/employees/employeeService';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import UploadDownloadBox from './UploadDownloadBox';
import { IHREmployee } from '../types/HREmployee';
import { downloadCsvTemplate, uploadCsv } from '../services/fileService';

interface LocalHREmployee extends IHREmployee {
  id: number;
}

export default function EmployeesTable() {
  type Row = LocalHREmployee;

  const [rows, setRows] = useState<Row[]>([]);
  const [quickFilterValue, setQuickFilterValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const columns: GridColDef<Row>[] = [
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

  const fetchEmployees = async () => {
    try {
      const res: Array<any> = await getEmployees();
      const rows: LocalHREmployee[] = res.map((employee: any) => ({
        id: employee.id,
        nome: employee.name,
        email: employee.email,
        cargo: employee.position,
        departamento: employee.department,
        dataDeAdmissao: employee.admission_date,
        dataDeAniversario: employee.birth_date
      }));
      setRows(rows);
    } catch (error: any) {
      console.error('Error fetching employees:', error);
      setRows([]);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (uploadSuccess) {
      const delayFetch = setTimeout(() => {
        fetchEmployees();
        setUploadSuccess(false);
      }, 1500);
      return () => clearTimeout(delayFetch);
    }
  }, [uploadSuccess]);

  const handleDelete = async (id: number) => {
    try {
      await deleteEmployee(id);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDownload = async () => {
    try {
      await downloadCsvTemplate();
      alert('Template baixado com sucesso!');
    } catch (error: any) {
      alert(error.message || 'Ocorreu um erro ao baixar o template.');
    }
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecione um arquivo para enviar.');
      return;
    }

    setUploading(true);

    try {
      await uploadCsv(selectedFile);
      setUploadSuccess(true);
      handleCloseModal();
    } catch (error: any) {
      alert(error.message || 'Ocorreu um erro ao enviar o arquivo.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="h-[631px] w-[90%]">
      {error && <Alert severity="error">{error}</Alert>}
      <div className="flex items-center justify-between mb-4 w-[100%]">
        <TextField
          placeholder="Busque pelo e-mail da empresa"
          variant="standard"
          value={quickFilterValue}
          onChange={(e) => setQuickFilterValue(e.target.value)}
          sx={{ marginLeft: '1vw', width: '26%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            )
          }}
        />
        <div className="flex items-center w-[auto]">
          <Button
            startIcon={<FileUploadOutlinedIcon style={{ fontSize: 30 }} />}
            onClick={handleOpenModal}
            sx={{
              padding: '6px 8px',
              width: 'auto',
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
            startIcon={<FileDownloadOutlinedIcon style={{ fontSize: 30 }} />}
            onClick={handleDownload}
            sx={{
              padding: '6px 8px',
              width: 'auto',
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
        pageSizeOptions={[10, 20, 30]}
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
            outline: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <UploadDownloadBox onFileSelect={handleFileSelect} />
          <Button
            onClick={handleUpload}
            disabled={!selectedFile}
            variant="outlined"
            sx={{
              mt: 2,
              alignSelf: 'center'
            }}
          >
            {uploading ? 'Enviando...' : 'Enviar'}
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={uploadSuccess}
        onClose={() => setUploadSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={1500}
      >
        <Alert onClose={() => setUploadSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Arquivo enviado com sucesso!
        </Alert>
      </Snackbar>
    </div>
  );
}
