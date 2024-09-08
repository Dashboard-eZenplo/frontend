import { Dialog, DialogTitle, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const LogoutModal = ({ open, onClose }: ModalProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem('authToken');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      sx={{
        '& .MuiDialog-paper': {
          width: '850px',
          height: '500px',
          border: '4px solid blue',
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          marginBottom: '16px',
          fontWeight: 'normal',
          fontSize: '65px'
        }}
      >
        CONFIRMAR SAÍDA
      </DialogTitle>

      <Typography
        align="center"
        sx={{
          fontWeight: 'normal',
          fontSize: '40px',
          marginBottom: '24px'
        }}
      >
        Você tem certeza que deseja <span style={{ color: 'blue' }}>sair</span> de sua conta?
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 4,
          justifyContent: 'center',
          width: '100%',
          maxWidth: '500px'
        }}
      >
        <Button
          onClick={() => {
            handleLogout();
            onClose();
          }}
          sx={{
            width: '500px',
            height: '69px',
            borderRadius: '10px',
            border: '2px solid blue',
            backgroundColor: '#ffffff',
            textTransform: 'none',
            fontSize: '28px',
            fontWeight: 'normal'
          }}
        >
          Sair
        </Button>
        <Button
          onClick={onClose}
          sx={{
            width: '500px',
            height: '69px',
            borderRadius: '10px',
            border: '2px solid black',
            backgroundColor: '#ffffff',
            color: '#000000',
            textTransform: 'none',
            fontSize: '28px',
            fontWeight: 'normal'
          }}
        >
          Cancelar
        </Button>
      </Box>
    </Dialog>
  );
};

export default LogoutModal;
