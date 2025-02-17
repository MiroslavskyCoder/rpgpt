// client/src/components/CustomTextInput.js
import React, { useState, useRef, useCallback } from 'react';
import { TextField, Menu, MenuItem, Box } from '@mui/material';

function CustomTextInput({ setContextMenuPosition, setShowContextMenu }) {
    const [contextMenu, setContextMenu] = useState(null); // {mouseX, mouseY} or null
    const [text, setText] = useState('');
    const inputRef = useRef(null);

    const handleContextMenu = useCallback((event) => {
        event.preventDefault();
        setContextMenuPosition({ x: event.clientX - 2, y: event.clientY - 4 });
        setShowContextMenu(true);
    }, [setContextMenuPosition, setShowContextMenu]);

    const handleClose = useCallback(() => {
        setShowContextMenu(false);
    }, [setShowContextMenu]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
        handleClose();
    }, [text, handleClose]);

    const handlePaste = useCallback(async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            setText(text + clipboardText);
        } catch (err) {
            console.error('Failed to read clipboard contents:', err);
        }
        handleClose();
    }, [text, handleClose]);

    const handleCut = useCallback(() => {
        navigator.clipboard.writeText(text);
        setText('');
        handleClose();
    }, [text, handleClose]);

    return (
        <Box sx={{ width: '100%' }} onContextMenu={handleContextMenu}>
            <TextField
                fullWidth
                label="Enter text"
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
                inputRef={inputRef}
            />
        </Box>
    );
}

export default CustomTextInput;