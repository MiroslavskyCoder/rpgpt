// client/src/components/ImageEditor.js
import React, { useState } from 'react';
import { Box, Typography, Slider, Button, Divider, Grid, TextField } from '@mui/material';

const ImageEditor = ({ imageUrl }) => {
    const [exposure, setExposure] = useState(0);
    const [contrast, setContrast] = useState(1);
    const [brightness, setBrightness] = useState(1);
    const [saturation, setSaturation] = useState(1);
    const [temperature, setTemperature] = useState(6500);
    const [tint, setTint] = useState(0);
    const [hue, setHue] = useState(0);

    const handleApplyChanges = () => {
        // Here you would make a request to your backend to apply the changes
        // For simplicity, we're just logging the values
        console.log('Exposure:', exposure);
        console.log('Contrast:', contrast);
        console.log('Brightness:', brightness);
        console.log('Saturation:', saturation);
        console.log('Temperature:', temperature);
        console.log('Tint:', tint);
        console.log('Hue:', hue);
    };

    return (
        <Box mt={3} bgcolor="background.paper" p={2} borderRadius={1}>
            <Typography variant="h6">Image Editor</Typography>
            <Divider style={{ backgroundColor: '#555', marginBottom: '10px' }} />

            {/* Image Preview */}
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Original"
                    style={{
                        maxWidth: '100%',
                        borderRadius: '8px',
                        filter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturation}) hue-rotate(${hue}deg)`,
                        WebkitFilter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturation}) hue-rotate(${hue}deg)`, // Safari support
                    }}
                />
            )}

            {/* Controls */}
            <Grid container spacing={2} mt={2}>
                {/* Exposure */}
                <Grid item xs={6}>
                    <Typography variant="subtitle2">Exposure</Typography>
                    <Slider
                        value={exposure}
                        onChange={(e, newValue) => setExposure(newValue)}
                        min={-1}
                        max={1}
                        step={0.01}
                    />
                    <TextField
                        value={exposure.toFixed(2)}
                        onChange={(e) => setExposure(parseFloat(e.target.value) || 0)}
                        margin="dense"
                        variant="outlined"
                        size="small"
                    />
                </Grid>

                {/* Contrast */}
                <Grid item xs={6}>
                    <Typography variant="subtitle2">Contrast</Typography>
                    <Slider
                        value={contrast}
                        onChange={(e, newValue) => setContrast(newValue)}
                        min={0}
                        max={2}
                        step={0.01}
                    />
                    <TextField
                        value={contrast.toFixed(2)}
                        onChange={(e) => setContrast(parseFloat(e.target.value) || 1)}
                        margin="dense"
                        variant="outlined"
                        size="small"
                    />
                </Grid>

                {/* Brightness */}
                <Grid item xs={6}>
                    <Typography variant="subtitle2">Brightness</Typography>
                    <Slider
                        value={brightness}
                        onChange={(e, newValue) => setBrightness(newValue)}
                        min={0}
                        max={2}
                        step={0.01}
                    />
                    <TextField
                        value={brightness.toFixed(2)}
                        onChange={(e) => setBrightness(parseFloat(e.target.value) || 1)}
                        margin="dense"
                        variant="outlined"
                        size="small"
                    />
                </Grid>

                {/* Saturation */}
                <Grid item xs={6}>
                    <Typography variant="subtitle2">Saturation</Typography>
                    <Slider
                        value={saturation}
                        onChange={(e, newValue) => setSaturation(newValue)}
                        min={0}
                        max={2}
                        step={0.01}
                    />
                    <TextField
                        value={saturation.toFixed(2)}
                        onChange={(e) => setSaturation(parseFloat(e.target.value) || 1)}
                        margin="dense"
                        variant="outlined"
                        size="small"
                    />
                </Grid>

                {/* Temperature */}
                <Grid item xs={6}>
                    <Typography variant="subtitle2">Temperature</Typography>
                    <Slider
                        value={temperature}
                        onChange={(e, newValue) => setTemperature(newValue)}
                        min={2000}
                        max={10000}
                        step={100}
                    />
                    <TextField
                        value={temperature}
                        onChange={(e) => setTemperature(parseInt(e.target.value) || 6500)}
                        margin="dense"
                        variant="outlined"
                        size="small"
                    />
                </Grid>

                {/* Tint */}
                <Grid item xs={6}>
                    <Typography variant="subtitle2">Tint</Typography>
                    <Slider
                        value={tint}
                        onChange={(e, newValue) => setTint(newValue)}
                        min={-100}
                        max={100}
                        step={1}
                    />
                    <TextField
                        value={tint}
                        onChange={(e) => setTint(parseInt(e.target.value) || 0)}
                        margin="dense"
                        variant="outlined"
                        size="small"
                    />
                </Grid>

                {/* Hue */}
                <Grid item xs={6}>
                    <Typography variant="subtitle2">Hue</Typography>
                    <Slider
                        value={hue}
                        onChange={(e, newValue) => setHue(newValue)}
                        min={-180}
                        max={180}
                        step={1}
                    />
                    <TextField
                        value={hue}
                        onChange={(e) => setHue(parseInt(e.target.value) || 0)}
                        margin="dense"
                        variant="outlined"
                        size="small"
                    />
                </Grid>
            </Grid>

            {/* Apply Changes Button */}
            <Button variant="contained" color="primary" onClick={handleApplyChanges} mt={3}>
                Apply Changes
            </Button>
        </Box>
    );
};

export default ImageEditor;