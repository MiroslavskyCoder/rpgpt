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
                main: amber[500],
            },
            secondary: {
                main: deepOrange[900],
            },
            background: {
                default: grey[900],
                paper: grey[800],
            },
            text: {
                primary: '#fff',
                secondary: '#bdbdbd',
            },
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: grey[900],
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundColor: grey[800],
                    },
                },
            },
            MuiMenu: {
                styleOverrides: {
                    paper: {
                        backgroundColor: grey[800],
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        color: '#fff',
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            RPGPT - React & Material UI
                        </Typography>
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Avatar sx={{ bgcolor: deepOrange[500] }}>UN</Avatar>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>

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