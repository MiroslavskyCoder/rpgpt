// client/src/components/CharacterSelection.js
import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import api from '../services/api';

const CharacterSelection = ({ onCharacterSelect }) => {
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState('');

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await api.getCharacters();
                setCharacters(response.data);
            } catch (error) {
                console.error("Error fetching characters:", error);
            }
        };
        fetchCharacters();
    }, []);

    const handleChange = async (event) => {
        const characterName = event.target.value;
        setSelectedCharacter(characterName);
        try {
            await api.selectCharacter(characterName);
            onCharacterSelect(characterName); // Pass the selected character to the parent
        } catch (error) {
            console.error("Error selecting character:", error);
        }
    };

    return (
        <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="character-select-label">Select Character</InputLabel>
            <Select
                labelId="character-select-label"
                id="character-select"
                value={selectedCharacter}
                onChange={handleChange}
                label="Select Character"
            >
                {characters.map((character) => (
                    <MenuItem key={character} value={character}>{character}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CharacterSelection;