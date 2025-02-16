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
import ContextMenu from './components/ContextMenu'; // Import ContextMenu

function App() {
    const [selectedCharacter, setSelectedCharacter] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [imageUrl, setImageUrl] = useState(''); // State to hold generated image URL
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [showContextMenu, setShowContextMenu] = useState(false);

    const handleCharacterSelect = (characterName) => {
        setSelectedCharacter(characterName);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenuPosition({ x: event.clientX, y: event.clientY });
        setShowContextMenu(true);
    };

    const menuItems = [
        { label: 'Undo', shortcut: 'Ctrl+Z', onClick: () => console.log('Undo') },
        { label: 'Redo', shortcut: 'Ctrl+Y', onClick: () => console.log('Redo') },
        { label: 'Cut', shortcut: 'Ctrl+X', onClick: () => console.log('Cut') },
        { label: 'Copy', shortcut: 'Ctrl+C', onClick: () => console.log('Copy') },
        { label: 'Paste', shortcut: 'Ctrl+V', onClick: () => console.log('Paste') },
    ];

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
            <Box sx={{ flexGrow: 1 }} onContextMenu={handleContextMenu}>

                <MainMenu />

                <ContextMenu
                    xPos={contextMenuPosition.x}
                    yPos={contextMenuPosition.y}
                    menuItems={menuItems}
                    showMenu={showContextMenu}
                    setShowMenu={setShowContextMenu}
                />

                <CharacterSelection onCharacterSelect={handleCharacterSelect} />
                <ChatArea />
                <ImageGeneration onImageGenerated={handleImageGenerated} /> {/* Pass the callback */}
                {imageUrl && <ImageEditor imageUrl={imageUrl} />} {/* Render ImageEditor if imageUrl is available */}
            </Box>
        </ThemeProvider>
    );
}

export default App;