import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Box, Typography, IconButton, InputAdornment, TextField, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import apiService from '../services/api';

function ChatArea() {
    const [chatHistory, setChatHistory] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [isSending, setIsSending] = useState(false);
    const chatAreaRef = useRef(null);

    const handleSendMessage = useCallback(async () => {
        if (prompt.trim() !== '') {
            setIsSending(true);

            try {
                const response = await apiService.getChatResponse(prompt);
                console.log(response.data);
                const newMessage = { text: prompt, sender: 'user' };
                const aiResponse = { text: response.data.response, sender: 'ai' };

                setChatHistory((prevHistory) => [...prevHistory, newMessage, aiResponse]);
                setPrompt('');
            } catch (error) {
                console.error('Failed to get chat response:', error);
                const errorMesage = { text: "Error getting response", sender: 'ai' };
                setChatHistory((prevHistory) => [...prevHistory, errorMesage]);
            } finally {
                setIsSending(false);
            }
        }
    }, [prompt, setChatHistory, setIsSending]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default form submission
            handleSendMessage();
        }
    };

    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '300px',
                overflowY: 'auto',
                padding: 2,
                border: '1px solid #ccc',
            }}
            ref={chatAreaRef}
        >
            <Typography variant="h6">Chat Area</Typography>
            {chatHistory.map((message, index) => (
                <Box key={index} sx={{ textAlign: message.sender === 'user' ? 'right' : 'left', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {message.sender === 'user' ? 'You:' : 'AI:'}
                    </Typography>
                    <Typography>{message.text}</Typography>
                </Box>
            ))}

            {/* Input area */}
            <Box sx={{ marginTop: 'auto', display: 'flex', alignItems: 'center' }}>
                <TextField
                    fullWidth
                    label="Enter your message"
                    variant="outlined"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleSendMessage} edge="end" disabled={isSending}>
                                    {isSending ? <CircularProgress size={24} /> : <SendIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        </Box>
    );
}

export default ChatArea;