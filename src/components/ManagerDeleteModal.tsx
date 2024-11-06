import { Dialog, DialogTitle, Typography, Box, Button } from '@mui/material';
import { IHRManager } from '../types/HRManager';

interface LocalHRManager extends IHRManager {
  id: number;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  selectedManager: LocalHRManager | null;
  handleDelete: (id: number) => Promise<void>;
}

const ManagerDeleteModal = ({ open, onClose, selectedManager, handleDelete }: ModalProps) => {
  const handleConfirmDelete = async () => {
    if (selectedManager) {
      await handleDelete(selectedManager.id);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          width: {
            xs: '80vw',
            sm: '60vw',
            md: '40vw'
          },
          maxWidth: '500px',
          height: 'auto',
          maxHeight: '70vh',
          border: '3px solid blue',
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px',
          margin: '0 auto'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%'
        }}
      >
        <Box>
          <DialogTitle
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: {
                xs: '18px',
                sm: '22px',
                md: '28px'
              },
              mt: {
                xs: '8px',
                sm: '20px',
                md: '30px'
              }
            }}
          >
            CONFIRMAR EXCLUSÃO
          </DialogTitle>

          <Typography
            sx={{
              textAlign: 'center',
              fontSize: {
                xs: '14px',
                sm: '18px',
                md: '20px'
              },
              marginBottom: {
                xs: '12px',
                sm: '16px',
                md: '20px'
              },
              fontWeight: 'bold'
            }}
          >
            Você tem certeza que deseja excluir o gerente {selectedManager?.name}?
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'row'
            },
            gap: 1,
            justifyContent: 'center',
            width: '100%',
            mt: {
              xs: '16px',
              sm: '30px',
              md: '20px'
            },
            px: 2,
            mb: '20px'
          }}
        >
          <Button
            onClick={handleConfirmDelete}
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
            onClick={onClose}
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
        </Box>
      </Box>
    </Dialog>
  );
};

export default ManagerDeleteModal;
