import { createTheme } from '@mui/material';

const customTheme = createTheme({
  typography: {
    fontFamily: 'inherit'
  },

  palette: {
    primary: {
      main: '#004BF9'
    },
    secondary: {
      main: '#007FFA'
    }
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1rem',
          paddingTop: '0.6rem',
          paddingBottom: '0.6rem',
          boxShadow: 'none',
          width: '325px',
          '&:hover': {
            backgroundColor: '#3370FF',
            boxShadow: 'none'
          }
        }
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            backgroundColor: '#FFFFFF',
            color: '#004BF9',
            '&:hover': {
              backgroundColor: '#FAFAFA'
            }
          }
        },
        {
          props: { variant: 'outlined', color: 'secondary' },
          style: {
            backgroundColor: '#FFFFFF',
            color: '#282828',
            borderColor: '#282828',
            '&:hover': {
              backgroundColor: '#FAFAFA',
              borderColor: '#282828'
            }
          }
        },
        {
          props: { fullWidth: true },
          style: {
            width: '100%'
          }
        }
      ]
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          variant: 'standard',
          fontSize: '1rem'
        }
      }
    }
  }
});

export default customTheme;
