import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Components {
    MuiDataGrid?: {
      styleOverrides?: {
        root?: React.CSSProperties;
        columnHeaders?: React.CSSProperties;
        columnHeader?: React.CSSProperties;
        toolbarContainer?: React.CSSProperties;
        filterPanel?: React.CSSProperties;
        checkbox?: React.CSSProperties;
      };
    };
  }
}

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
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          variant: 'standard',
          fontSize: '1rem'
        }
      }
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          //border: 'none',
          borderRadius: '20px',
        },
        columnHeaders: {
          backgroundColor: '#004BF9',
          color: '#FFFFFF',
        },
        columnHeader: {
          backgroundColor: '#004BF9',
          color: '#FFFFFF'
        },
        toolbarContainer: {
          border: 'none',
        },
        filterPanel: {
          backgroundColor: '#004BF9',
          color: '#8C8C8C'
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#8C8C8C',
          '&:hover': {
            backgroundColor: '#FAFAFA',
            border: 'none'
          },
          '&:focus': {
            outline: 'none',
            border: 'none'
          },
        }
      }
    },
  }
});

export default customTheme;