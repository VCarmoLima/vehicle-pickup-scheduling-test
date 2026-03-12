import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#D32F2F',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#424242',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#F4F6F8',
            paper: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 8,
    },
});