import React, { useState, useEffect } from 'react';
import { Modal, Box, IconButton, Typography, Avatar, CircularProgress, useMediaQuery, useTheme, Paper, Grid, keyframes, Fab } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckIcon from '@mui/icons-material/Check';
import apiService from '../services/api';

const slideInLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const CharacterSelectModal = ({ open, onClose, onSelectCharacter }) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await apiService.getCharacters();
                setCharacters(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch characters:", err);
                setError("Failed to load characters.");
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    const handleNext = () => {
        if (isTransitioning) return;
        setSlideDirection('right');
        setIsTransitioning(true);

        setTimeout(() => {
            setCurrentIndex((prevIndex) => {
                const newIndex = (prevIndex + 1) % characters.length;
                return newIndex;
            });
            setIsTransitioning(false);
            setSlideDirection(null);
        }, 300);
    };

    const handlePrevious = () => {
        if (isTransitioning) return;
        setSlideDirection('left');
        setIsTransitioning(true);

        setTimeout(() => {
            setCurrentIndex((prevIndex) => {
                const newIndex = (prevIndex - 1 + characters.length) % characters.length;
                return newIndex;
            });
            setIsTransitioning(false);
            setSlideDirection(null);
        }, 300);
    };

    const handleSelect = (character) => {
        onSelectCharacter(character);
        onClose();
    };

    if (loading) {
        return (
            <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ bgcolor: 'background.paper', boxShadow: 24, p: 4, textAlign: 'center' }}>
                    <CircularProgress />
                    <Typography>Loading characters...</Typography>
                </Box>
            </Modal>
        );
    }

    if (error) {
        return (
            <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ bgcolor: 'background.paper', boxShadow: 24, p: 4, textAlign: 'center', color: 'red' }}>
                    <Typography>{error}</Typography>
                </Box>
            </Modal>
        );
    }

    const currentCharacter = characters[currentIndex];
    const prevCharacterIndex = (currentIndex - 1 + characters.length) % characters.length;
    const nextCharacterIndex = (currentIndex + 1) % characters.length;
    const prevCharacter = characters[prevCharacterIndex];
    const nextCharacter = characters[nextCharacterIndex];

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '& .MuiBackdrop-root': {
                    backdropFilter: 'blur(5px)',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                },
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: isSmallScreen ? '100vw' : 600,
                    height: isSmallScreen ? '100vh' : 400,
                    bgcolor: 'transparent',
                    position: 'relative',
                    overflow: 'hidden',
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Previous Character */}
                <Box
                    sx={{
                        width: 150,
                        textAlign: 'center',
                        opacity: 0.6,
                        transition: 'opacity 0.3s',
                        '&:hover': {
                            opacity: 1,
                        },
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    onClick={handlePrevious}
                >
                    {prevCharacter && (
                        <>
                            <Box
                                sx={{
                                    width: 75,
                                    height: 75,
                                    overflow: 'hidden', // Clip the content that overflows
                                    borderRadius: '50%', // Make it a circle
                                    margin: '0 auto',
                                    display: 'flex', // Center the content horizontally
                                    alignItems: 'center', // Center the content vertically
                                    justifyContent: 'center',
                                }}
                            >
                                <Avatar
                                    src={prevCharacter.image}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                            </Box>
                            <Typography variant="subtitle2">{prevCharacter.name}</Typography>
                        </>
                    )}
                </Box>

                {/* Current Character */}
                <Box
                    sx={{
                        width: 200,
                        textAlign: 'center',
                        animation: slideDirection === 'right' ? `${slideInRight} 0.3s ease-out` : slideDirection === 'left' ? `${slideInLeft} 0.3s ease-out` : 'none',
                        transition: 'opacity 0.3s',
                        position: 'relative',
                        display: 'flex', // Add flex
                        flexDirection: 'column', // Vertical arrangement
                        alignItems: 'center', // Center horizontally
                        justifyContent: 'center', // Distribute space evenly
                    }}
                >
                    <Box
                        sx={{
                            width: 120,
                            height: 120,
                            overflow: 'hidden',
                            borderRadius: '50%',
                            margin: '0 auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Avatar
                            src={currentCharacter.image}
                            sx={{
                                width: '100%',
                                height: '100%',
                                fontSize: '60px' // Add this line to display initials
                            }}
                        />
                    </Box>
                    <Typography variant="h6">{currentCharacter.name}</Typography>
                    <Typography variant="body2">{currentCharacter.description}</Typography>
                    <Fab
                        color="primary"
                        aria-label="select"
                        onClick={() => handleSelect(currentCharacter)}
                        disabled={isTransitioning}
                        sx={{
                            position: 'static',
                            marginTop: '16px',
                        }}
                    >
                        <CheckIcon />
                    </Fab>
                </Box>

                {/* Next Character */}
                <Box
                    sx={{
                        width: 150,
                        textAlign: 'center',
                        opacity: 0.6,
                        transition: 'opacity 0.3s',
                        '&:hover': {
                            opacity: 1,
                        },
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    onClick={handleNext}
                >
                    {nextCharacter && (
                        <>
                            <Box
                                sx={{
                                    width: 75,
                                    height: 75,
                                    overflow: 'hidden',
                                    borderRadius: '50%',
                                    margin: '0 auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Avatar
                                    src={nextCharacter.image}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                            </Box>
                            <Typography variant="subtitle2">{nextCharacter.name}</Typography>
                        </>
                    )}
                </Box>
            </Paper>
        </Modal>
    );
};

export default CharacterSelectModal;