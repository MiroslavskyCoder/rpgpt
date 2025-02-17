// client/src/components/ChatArea.js
import React, { useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import CustomTextInput from './CustomTextInput'; // Import CustomTextInput

function ChatArea() {
    const [chatHistory, setChatHistory] = useState([]);
    const [prompt, setPrompt] = useState('');

    const handleSendMessage = useCallback(() => {
        if (prompt.trim() !== '') {
            // Logic to send the prompt to the backend and get a response
            const newMessage = { text: prompt, sender: 'user' };
            setChatHistory([...chatHistory, newMessage]);
            setPrompt(''); // Clear the prompt input after sending
        }
    }, [prompt, chatHistory, setChatHistory]);

    const [contextMenuPosition, setContextMenuPosition] = useState(null);
    const [showContextMenu, setShowContextMenu] = useState(false);

    const handleContextMenu = useCallback((event) => {
        event.preventDefault();
        setContextMenuPosition({ x: event.clientX, y: event.clientY });
        setShowContextMenu(true);
        // Handle context menu events here
    }, []);
    // Handle context menu events here
    const handleCloseContextMenu = useCallback(() => {
        setShowContextMenu(false);
    }, []);
    // Handle context menu events here

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '300px', // Adjust the height as needed
                overflowY: 'auto',
                padding: 2,
                border: '1px solid #ccc',
            }}
        >
            <Typography variant="h6">Chat Area</Typography>
            {/* Display chat history here */}
            {chatHistory.map((message, index) => (
                <Typography key={index}>
                    {message.sender}: {message.text}
                </Typography>
            ))}

            {/* Input area */}
            <Box sx={{ marginTop: 'auto' }}>
                <CustomTextInput setContextMenuPosition={setContextMenuPosition} setShowContextMenu={setShowContextMenu} /> {/* Use CustomTextInput for prompts */}
            </Box>
        </Box>
    );
}

export default ChatArea;