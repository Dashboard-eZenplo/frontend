import { Dialog, DialogTitle, Typography, Box } from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  buttons: React.ReactNode;
}

const ModalComponent = ({ open, onClose, title, description, buttons }: ModalProps) => {
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
            {title}
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
            {description}
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
          {buttons}
        </Box>
      </Box>
    </Dialog>
  );
};

export default ModalComponent;
