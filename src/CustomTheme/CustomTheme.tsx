import { createTheme } from "@mui/material";

const CustomTheme = createTheme({

    //fonte
    typography: {
        fontFamily: 'inherit'
      },

      //paleta de cores
    palette: {
        primary: {
            main: '#004BF9'
        },
        secondary: {
            main: '#007FFA',
        }
    },

    //customização de componentes específicos
    components: {

        //botão
        MuiButton: {
            styleOverrides: {

                //estilização padrão para todos botões
                root: {
                  textTransform: 'none',
                  fontSize: '1 rem', 
                  paddingTop: '0.6rem', 
                  paddingBottom: '0.6rem', 
                  boxShadow: 'none',
                  width: '325px',
                  '&:hover': {
                    boxShadow: 'none', 
                  },
                
                },
              },
            variants: [
                //fundo azul - texto branco
                {
                    props: { variant: 'contained', color: 'primary' },
                    style: {
                        backgroundColor: '#004BF9',
                        color: '#FFFFFF',
                        '&:hover': {
                            backgroundColor: '#3370FF',
                        }
                    }
                },

                //fundo branco - texto e borda azul
                {
                    props: { variant: 'outlined', color: 'primary' },
                    style: {
                        backgroundColor: '#FFFFFF',
                        color: '#004BF9',
                        '&:hover': {
                            backgroundColor: '#FAFAFA',
                        }
                    }
                },

                //fundo branco - texto e borda preto
                {
                    props: { variant: 'outlined', color: 'secondary' },
                    style: {
                        backgroundColor: '#FFFFFF',
                        color: '#282828',
                        borderColor: '#282828',
                        '&:hover': {

                            backgroundColor: '#FAFAFA',
                            borderColor: '#282828',
                        }
                    }
                },

                //largura 100%
                {
                    props: { fullWidth: true},
                    style: {
                        width: '100%'
                    }
                }
            ]
        }
    }
})

export default CustomTheme;