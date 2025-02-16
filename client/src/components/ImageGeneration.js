// client/src/components/ImageGeneration.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, LinearProgress } from '@mui/material';
import api from '../services/api';

const ImageGeneration = ({ onImageGenerated }) => {
    const [imagePrompt, setImagePrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (progress === 100 && imageUrl) {
            onImageGenerated(imageUrl); // Call the callback with the new URL
            setIsGenerating(false);
        }
    }, [progress, imageUrl, onImageGenerated]);

    const handleGenerateImage = async () => {
        setIsGenerating(true);
        setProgress(0); // Reset progress
        setImageUrl('');  // Reset image URL

        try {
            const response = await fetch('/api/generate_image_sse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: imagePrompt }),
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            const processStream = async () => {
                while (true) {
                    const { done, value } = await reader.read();

                    if (done) {
                        console.log("Stream complete");
                        setIsGenerating(false);
                        break;
                    }

                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n').filter(line => line.trim() !== ''); // Split into lines and filter out empty lines

                    for (const line of lines) {
                        try {
                            const data = JSON.parse(line);

                            if (data.progress !== undefined) {
                                setProgress(data.progress);
                            } else if (data.image_url) {
                                setImageUrl(data.image_url);
                                onImageGenerated(data.image_url);
                            } else if (data.error) {
                                console.error("Error from server:", data.error);
                                setIsGenerating(false);
                                setImageUrl('');
                                setProgress(0);
                            }
                        } catch (e) {
                            console.error("Failed to parse JSON:", line);
                        }
                    }
                }
            };

            await processStream();
        } catch (error) {
            console.error("Error generating image:", error);
            setIsGenerating(false);
            setImageUrl('');
            setProgress(0);
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
            <Button variant="contained" color="primary" onClick={handleGenerateImage} disabled={isGenerating}>
                Generate Image
            </Button>
            {isGenerating && (
                <Box mt={2}>
                    <Typography variant="subtitle2">Generating...</Typography>
                    <LinearProgress variant="determinate" value={progress} />
                </Box>
            )}
        </Box>
    );
};

export default ImageGeneration;