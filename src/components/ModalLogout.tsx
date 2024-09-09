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
            maxWidth="xs"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    width: '100%',
                    maxWidth: '400px',
                    maxHeight: '90vh',
                    border: '4px solid blue',
                    borderRadius: '20px',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    margin: {
                        xs: '0 auto', // Centraliza horizontalmente em telas menores
                        sm: '0 auto', // Centraliza horizontalmente em telas maiores
                    },
                },
            }}
        >
            <DialogTitle
                sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '30px', // Tamanho ajustado
                }}
            >
                CONFIRMAR SAÍDA
            </DialogTitle>

            <Typography
                sx={{
                    textAlign: 'center',
                    fontSize: {
                        xs: '16px',
                        sm: '18px',
                        md: '20px',
                    },
                    marginBottom: '24px',
                }}
            >
                Você tem certeza que deseja <strong><span style={{ color: 'blue' }}>sair</span></strong> de sua conta?
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {
                        xs: 'column',
                        sm: 'row',
                    },
                    gap: 2,
                    justifyContent: 'center', // Centraliza os botões horizontalmente
                    width: '100%',
                    mt: '24px',
                    px: 2, // Adiciona padding horizontal para melhor alinhamento
                }}
            >
                <Button
                    onClick={() => {
                        handleLogout();
                        onClose();
                    }}
                    sx={{
                        minWidth: '120px',
                        height: '40px',
                        borderRadius: '10px',
                        border: '2px solid blue',
                        backgroundColor: '#ffffff',
                        textTransform: 'none',
                        fontSize: {
                            xs: '14px',
                            sm: '16px',
                            md: '18px',
                        },
                    }}
                >
                    Sair
                </Button>
                <Button
                    onClick={onClose}
                    sx={{
                        minWidth: '120px',
                        height: '40px',
                        borderRadius: '10px',
                        border: '2px solid black',
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        textTransform: 'none',
                        fontSize: {
                            xs: '14px',
                            sm: '16px',
                            md: '18px',
                        },
                    }}
                >
                    Cancelar
                </Button>
            </Box>
        </Dialog>
    );
};

export default LogoutModal;
