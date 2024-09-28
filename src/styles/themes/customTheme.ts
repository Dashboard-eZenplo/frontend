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
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
        columnHeader: {
          backgroundColor: '#004BF9',
          color: '#FFFFFF'
        },
      },
    },
  }
});

export default customTheme;