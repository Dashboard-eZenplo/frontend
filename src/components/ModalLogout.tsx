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
            maxWidth="xl"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    width: {
                        xs: '90%',
                        sm: '100%',
                        md: '850px',
                    },
                    maxWidth: '850px',
                    height: {
                        xs: 'auto',
                        sm: 'auto',
                        md: '500px',
                    },
                    maxHeight: {
                        xs: '80vh',
                        sm: '80vh',
                        md: '500px',
                    },
                    border: '4px solid blue',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                    margin: {
                        xs: '0 auto',
                        sm: '0 auto',
                    },
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                }}
            >
                <Box>
                    <DialogTitle
                        sx={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: {
                                xs: '30px',
                                sm: '30px',
                                md: '65px',
                            },
                            mt: {
                                xs: '0',
                                sm: '20px',
                                md: '30px',
                            },
                        }}
                    >
                        CONFIRMAR SAÍDA
                    </DialogTitle>

                    <Typography
                        sx={{
                            textAlign: 'center',
                            fontSize: {
                                xs: '24px',
                                sm: '40px',
                                md: '40px',
                            },
                            marginBottom: {
                                xs: '24px',
                                sm: '20px',
                                md: '24px',
                            },
                            fontWeight: 'bold',
                        }}
                    >
                        Você tem certeza que deseja <strong><span className="text-primary">sair</span></strong> de sua conta?
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        gap: 2,
                        justifyContent: 'center',
                        width: '100%',
                        mt: {
                            xs: '24px',
                            sm: '40px',
                            md: '30px',
                        },
                        px: 2,
                        mb: '40px',
                    }}
                >
                    <Button
                        onClick={() => {
                            handleLogout();
                            onClose();
                        }}
                        fullWidth
                        sx={{
                            minWidth: {
                                xs: '120px',
                                sm: '325px',
                            },
                            height: {
                                xs: '40px',
                                sm: '69px',
                            },
                            borderRadius: '10px',
                            border: '2px solid blue',
                            backgroundColor: '#ffffff',
                            textTransform: 'none',
                            fontSize: {
                                xs: '14px',
                                sm: '18px',
                            },
                        }}
                    >
                        Sair
                    </Button>
                    <Button
                        onClick={onClose}
                        fullWidth
                        sx={{
                            minWidth: {
                                xs: '120px',
                                sm: '325px',
                            },
                            height: {
                                xs: '40px',
                                sm: '69px',
                            },
                            borderRadius: '10px',
                            border: '2px solid black',
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            textTransform: 'none',
                            fontSize: {
                                xs: '14px',
                                sm: '18px',
                            },
                        }}
                    >
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export default LogoutModal;
