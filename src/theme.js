import {createTheme} from '@mui/material/styles';

export default createTheme({
  components : {
    MuiTableCell : {
      defaultProps : {
        align : 'center',
      }
    },
    MuiButton : {
      defaultProps : {
        variant : 'contained',
      }
    },
    MuiTextField : {
      defaultProps : {
        fullWidth : true,
        size      : 'small'
      },
      styleOverrides : {
        root : ({theme}) => theme.unstable_sx({
          mb:1
        })
      }
    },
    MuiFormControl : {
      defaultProps : {
        fullWidth : true,
        size      : 'small'
      }
    },
    MuiPaper : {
      defaultProps : {
        elevation : 4
      },
      styleOverrides : {
        root : ({theme}) => theme.unstable_sx({
          m:1, p:1
        })
      }
    }
  }
});