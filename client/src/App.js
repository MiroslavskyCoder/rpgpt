// client/src/App.js
import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Button, TextField, CssBaseline, createTheme, ThemeProvider, AppBar, Toolbar, IconButton, Menu, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { amber, deepOrange, grey } from '@mui/material/colors';
import CharacterSelection from './components/CharacterSelection';
import ChatArea from './components/ChatArea';
import ImageGeneration from './components/ImageGeneration';
import ImageEditor from './components/ImageEditor'; // Import ImageEditor
import MainMenu from './components/MainMenu';

function App() {
    const [selectedCharacter, setSelectedCharacter] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [imageUrl, setImageUrl] = useState(''); // State to hold generated image URL

    const handleCharacterSelect = (characterName) => {
        setSelectedCharacter(characterName);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Callback to receive the generated image URL from ImageGeneration
    const handleImageGenerated = (url) => {
        setImageUrl(url);
    };

    const theme = createTheme({
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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
                <MainMenu /> 

                <Box p={3}>
                    <CharacterSelection onCharacterSelect={handleCharacterSelect} />
                    <ChatArea />
                    <ImageGeneration onImageGenerated={handleImageGenerated} /> {/* Pass the callback */}
                    {imageUrl && <ImageEditor imageUrl={imageUrl} />} {/* Render ImageEditor if imageUrl is available */}
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;