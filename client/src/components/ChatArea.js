// client/src/components/ChatArea.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Divider } from '@mui/material';
import api from '../services/api';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Example icon for actions
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ChatArea = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null); //For menu

    const handleSendMessage = async () => {
        try {
            const response = await api.getResponse(prompt);
            setChatHistory([...chatHistory, { type: 'user', message: prompt }, { type: 'bot', message: response.data.response }]);
            setPrompt('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box mt={3} bgcolor="background.paper" p={2} borderRadius={1}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" color="white">Chat</Typography> {/* White text for Chat title */}
                <div>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                backgroundColor: '#424242', // Dark background for menu
                                color: 'white', // White text for menu items
                            },
                        }}
                    >
                        <MenuItem onClick={handleClose}>Clear Chat</MenuItem>
                        <MenuItem onClick={handleClose}>Save Chat</MenuItem>
                    </Menu>
                </div>
            </Box>
            <Divider style={{ backgroundColor: '#555', marginBottom: '10px' }} />
            <Box id="chat-history" style={{ height: '200px', overflowY: 'auto', padding: '10px', border: '1px solid #555', marginBottom: '10px', color: 'white' }}>
                {chatHistory.map((message, index) => (
                    <Typography key={index} variant="body1">
                        <strong>{message.type === 'user' ? 'You:' : 'Bot:'}</strong> {message.message}
                    </Typography>
                ))}
            </Box>
            <TextField
                fullWidth
                label="Your Message"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                margin="normal"
                variant="outlined"
                color="primary"
            />
            <Button variant="contained" color="primary" onClick={handleSendMessage}>Send</Button>
        </Box>
    );
};

export default ChatArea;