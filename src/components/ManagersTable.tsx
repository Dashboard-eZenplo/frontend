import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Alert, IconButton, InputAdornment, TextField, Button } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ptBR } from '@mui/x-data-grid/locales';
import { useEffect, useState } from 'react';
import { deleteManager, getManagers } from '../services/managers/managerService';
import { IHRManager } from '../types/HRManager';
import ManagerDeleteModal from './ModalComponent';

interface LocalHRManager extends IHRManager {
  id: number;
}

export default function ManagersTable() {
  type Row = LocalHRManager;

  const [rows, setRows] = useState<Row[]>([]);

  const [quickFilterValue, setQuickFilterValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState<LocalHRManager | null>(null);

  const handleDeleteClick = (manager: LocalHRManager) => {
    setSelectedManager(manager);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (selectedManager) {
      try {
        await deleteManager(selectedManager.id);
        setRows((prevRows) => prevRows.filter((row) => row.id !== selectedManager.id));
      } catch (error: any) {
        setError(error.message);
      }
      closeModal();
    }
  };

  const modalButtons = (
    <>
      <Button
        onClick={handleDelete}
        fullWidth
        sx={{
          minWidth: {
            xs: '100px',
            sm: '120px',
            md: '140px'
          },
          height: {
            xs: '30px',
            sm: '40px',
            md: '45px'
          },
          borderRadius: '8px',
          border: '2px solid blue',
          backgroundColor: '#ffffff',
          textTransform: 'none',
          fontSize: {
            xs: '12px',
            sm: '14px',
            md: '16px'
          }
        }}
      >
        Excluir
      </Button>
      <Button
        onClick={closeModal}
        fullWidth
        sx={{
          minWidth: {
            xs: '100px',
            sm: '120px',
            md: '140px'
          },
          height: {
            xs: '30px',
            sm: '40px',
            md: '45px'
          },
          borderRadius: '8px',
          border: '2px solid black',
          backgroundColor: '#ffffff',
          color: '#000000',
          textTransform: 'none',
          fontSize: {
            xs: '12px',
            sm: '14px',
            md: '16px'
          }
        }}
      >
        Cancelar
      </Button>
    </>
  );

  const columns: GridColDef<Row>[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'name',
      headerName: 'Nome',
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
        <IconButton onClick={() => handleDeleteClick(params.row)}>
          <DeleteOutlinedIcon />
        </IconButton>
      )
    }
  ];

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const data = await getManagers();

        const rows: LocalHRManager[] = data.managers.map(
          ([id, name, email, cnpj, telefone]: any) => ({
            id,
            name,
            email,
            cnpj,
            telefone
          })
        );

        setRows(rows);
      } catch (error: any) {
        console.error('Error fetching managers:', error);
        setRows([]);
      }
    };

    fetchManagers();
  }, []);

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
        pageSizeOptions={[10]}
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
      <ManagerDeleteModal
        open={isModalOpen}
        onClose={closeModal}
        title='CONFIRMAR EXCLUSÃO'
        description={`Tem certeza que deseja deletar ${selectedManager?.name}?`}
        buttons={modalButtons}
      />
    </div>
  );
}
