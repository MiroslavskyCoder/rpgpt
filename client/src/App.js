// client/src/App.js
import React, { useState, useCallback, useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import MainMenu from './components/MainMenu';
import ContextMenu from './components/ContextMenu';
import ChatArea from './components/ChatArea';
import ImageGeneration from './components/ImageGeneration';
import ImageEditor from './components/ImageEditor';
import { darkTheme } from './styles/MuiComponents'; 
import CharacterSelectModal from './components/CharacterSelectModal'; // Import CharacterSelectModal

function App() {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true); // Initial state: modal is open on app load

    useEffect(() => {
        // Open the modal only on initial load if no character is selected
        if (!selectedCharacter) {
            setIsModalOpen(true);
        }
    }, [selectedCharacter]);

    const handleCharacterSelect = (character) => {
        setSelectedCharacter(character);
    };

    const handleContextMenu = useCallback((event) => {
        event.preventDefault();
        setContextMenuPosition({ x: event.clientX - 2, y: event.clientY - 4 });
        setShowContextMenu(true);
    }, []);

    const menuItems = [
        { label: 'Undo', shortcut: 'Ctrl+Z', onClick: () => console.log('Undo') },
        { label: 'Redo', shortcut: 'Ctrl+Y', onClick: () => console.log('Redo') },
        { label: 'Cut', shortcut: 'Ctrl+X', onClick: () => console.log('Cut') },
        { label: 'Copy', shortcut: 'Ctrl+C', onClick: () => console.log('Copy') },
        { label: 'Paste', shortcut: 'Ctrl+V', onClick: () => console.log('Paste') },
    ];

    const handleImageGenerated = useCallback((url) => {
        try {
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
            const isValidImageUrl = imageExtensions.some(ext => url.toLowerCase().endsWith(ext));

            if (isValidImageUrl) {
                setImageUrl(url);
            } else {
                console.error('Invalid image URL:', url);
                // Handle the error appropriately, maybe show an error message to the user
            }
        } catch (error) {
            console.error("Error handling image URL:", error);
        }
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100vw',
                    height: '100vh',
                    overflow: 'auto',
                    backgroundColor: darkTheme.palette.background.default,
                    color: darkTheme.palette.text.primary,
                    padding: 2, // Add some padding
                }}
            >
                <MainMenu />
                <ContextMenu
                    xPos={contextMenuPosition.x}
                    yPos={contextMenuPosition.y}
                    menuItems={menuItems}
                    showMenu={showContextMenu}
                    setShowMenu={setShowContextMenu}
                /> 
                {selectedCharacter && (
                    <Box>
                        <Typography>Selected Character: {selectedCharacter.name}</Typography>
                    </Box>
                )}
                <ChatArea />
                <ImageGeneration onImageGenerated={handleImageGenerated} />
                {imageUrl && <ImageEditor imageUrl={imageUrl} />}
                <CharacterSelectModal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    onSelectCharacter={handleCharacterSelect}
                />
            </Box>
        </ThemeProvider>
    );
}

export default App;