// client/src/components/VersionTicker.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import apiService from '../services/api'; // Import your apiService

function VersionTicker() {
    const [versions, setVersions] = React.useState(null);

    React.useEffect(() => {
        const fetchVersions = async () => {
            try {
                const response = await apiService.getVersions(); // Assuming you have a getVersions endpoint in your apiService
                setVersions(response.data);
            } catch (error) {
                console.error('Failed to fetch versions:', error);
                setVersions({ error: 'Failed to load versions' }); // Set an error message if fetching fails
            }
        };

        fetchVersions();
    }, []);

    if (!versions) {
        return <Typography>Loading versions...</Typography>;
    }

    if (versions.error) {
        return <Typography color="error">{versions.error}</Typography>;
    }

    // Prepare the version string
    const versionString = Object.entries(versions)
        .map(([key, value]) => `<span style="font-weight: bold;">${key}:</span> ${value}`)
        .join('  <span style="font-size: 1.5em; vertical-align: middle; font-weight: 900; color: #4dd0e1;">|</span>  ');

    return (
        <Box
            sx={{
                bgcolor: '#121212', /* Set the background to black */
                color: 'white',
                height: '30px', /* Increased height */
                display: "flex",
                flexDirection: 'row', // Added flexDirection: 'row'
                alignItems: 'center', // Vertically center the text
                justifyContent: 'center', // Horizontally center the text
                padding: '0 8px', // Add some padding
                overflow: 'hidden', // Prevent text from overflowing
                whiteSpace: 'nowrap', // Keep text on one line
                textOverflow: 'ellipsis', // Show ellipsis if text overflows
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 500, fontSize: '16px', color: 'white' }} dangerouslySetInnerHTML={{ __html: versionString }}/>
        </Box>
    );
}

export default VersionTicker;