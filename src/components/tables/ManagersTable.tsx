import * as React from 'react';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

export default function ManagersTable(rows: []) {

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nome', headerName: 'Nome' },
    { field: 'email', headerName: 'E-mail' },
    { field: 'cnpj', headerName: 'CNPJ' },
    { field: 'telefone', headerName: 'Telefone' },
  ];

  return (
    <Box>
      <DataGrid
      rows={rows}
      columns={columns}
      />
    </Box>
  );  
}
