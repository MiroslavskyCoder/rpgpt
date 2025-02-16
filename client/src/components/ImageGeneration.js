// client/src/components/ImageGeneration.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import api from '../services/api';

const ImageGeneration = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [imagePrompt, setImagePrompt] = useState('');

    const handleGenerateImage = async () => {
        try {
            const response = await api.generateImage(imagePrompt);
            setImageUrl(response.data.image_url);
        } catch (error) {
            console.error("Error generating image:", error);
        }
    };

    return (
    <Box mt={3} bgcolor="background.paper" p={2} borderRadius={1}>
        <Typography variant="h6">Image Generation</Typography>
        <TextField
            fullWidth
            label="Image Prompt"
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
            margin="normal"
            variant="outlined"
            color="primary"
        />
        <Button variant="contained" color="primary" onClick={handleGenerateImage}>Generate Image</Button>
            {imageUrl && <img src={imageUrl} alt="Generated" style={{ marginTop: '10px', maxWidth: '100%', borderRadius: '8px' }} />}
        </Box>
    );
};

export default ImageGeneration;