import React, { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import EmployeesTable from '../../components/EmployeesTable';
import Header from '../../components/Header';
import { defaultHeaderOptions } from '../../config/HeaderOptions';
import Background from '../../components/Background';
import UploadDownloadBox from '../../components/UploadDownloadBox';

function EmployeesPage() {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <Background>
      <Header headerOptions={defaultHeaderOptions.logoutOnly} />
      <div className="flex flex-col items-center p-3 min-h-screen">
        <div className="flex justify-center w-full mb-8">
          <EmployeesTable />
        </div>
        <div className="">
          <Button variant="" color="" onClick={}>
            Download Modelo
          </Button>
          <Button variant="" color="" onClick={handleOpenModal}>
            Upload Modelo
          </Button>

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
      </div>
    </Background>
  );
}

export default EmployeesPage;
