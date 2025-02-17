// client/src/styles/MuiComponents.js
import { createTheme } from '@mui/material/styles'; 

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#4dd0e1',
        },
        secondary: {
            main: '#757575',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0bec5',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1e1e1e',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1e1e1e',
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#1e1e1e',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                    backgroundColor: '#424242',
                    '&:hover': {
                        backgroundColor: '#616161',
                    },
                },
            },
        },
    },
});