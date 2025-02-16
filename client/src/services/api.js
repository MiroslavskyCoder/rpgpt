// client/src/services/api.js
import axios from 'axios';

const API_BASE_URL = '/api'; //  Relative URL for API

const api = {
    getCharacters: () => axios.get(`${API_BASE_URL}/characters`),
    selectCharacter: (characterName) => axios.post(`${API_BASE_URL}/select_character`, { character_name: characterName }),
    getResponse: (prompt) => axios.post(`${API_BASE_URL}/get_response`, { prompt: prompt }),
    generateImage: (prompt, negative_prompt, width, height, cfg_scale) => axios.post(`${API_BASE_URL}/generate_image`, { prompt, negative_prompt, width, height, cfg_scale }),
};

export default api;