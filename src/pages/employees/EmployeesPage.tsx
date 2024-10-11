import { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import EmployeesTable from '../../components/EmployeesTable';
import Header from '../../components/Header';
import { defaultHeaderOptions } from '../../config/HeaderOptions';
import Background from '../../components/Background';
import UploadDownloadBox from '../../components/UploadDownloadBox';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

function EmployeesPage() {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <Background>
      <Header headerOptions={defaultHeaderOptions.logoutOnly} />
      <div className="relative flex flex-col items-center p-3 min-h-screen">
        <div className="flex justify-end w-full">
          <Button
            startIcon={<FileUploadOutlinedIcon sx={{ fontSize: 60 }} />}
            onClick={handleOpenModal}
            sx={{
              padding: 0,
              minWidth: 'auto',
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
            startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 60 }} />}
            sx={{
              padding: 0,
              minWidth: 'auto',
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
        <div className="flex justify-center w-full mb-8">
          <EmployeesTable />
        </div>
        <Modal open={open} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
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
    </Background>
  );
}

export default EmployeesPage;
