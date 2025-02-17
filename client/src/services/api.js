// client/src/services/api.js
import axios from 'axios';

// Define the base URL for your API
const API_BASE_URL = '/api'; // Or your actual API URL

// Create an Axios instance with default configuration
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 0, // Set timeout to 0 for infinite timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor (optional)
api.interceptors.request.use(
    (config) => {
        // You can modify the request config here (e.g., add authentication token)
        // config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    (error) => {
        // Handle request error
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor
api.interceptors.response.use(
    (response) => {
        // You can modify the response data here
        return response;
    },
    (error) => {
        // Handle response error
        console.error('Response Error:', error);
        return Promise.reject(error);
    }
);

// Define API endpoints
const apiService = {
    getInfo: () => api.get('/info'),
    getChatResponse: (
        prompt,
        characterName = 'Default',
        characterDescription = 'A helpful AI.',
        characterStyleOfSpeech = 'Default style',
        characterCatchphrases = ['Default catchphrase'],
        characterPersonalityTraits = ['Default trait'],
        characterRelationships = 'No relationships',
        characterNsfwTraits = ['Default NSFW trait'],
        characterAllowedTopics = ['Default allowed topic'],
        characterBannedTopics = ['Default banned topic']
    ) => {
        const data = {
            prompt,
            characterName,
            characterDescription,
            characterStyleOfSpeech,
            characterCatchphrases,
            characterPersonalityTraits,
            characterRelationships,
            characterNsfwTraits,
            characterAllowedTopics,
            characterBannedTopics
        };
        return api.post('/chat', data);
    },
    generateImage: (prompt) => api.post('/image', { prompt }),
    getVersions: () => api.get('/versions'),
    getCharacters: () => api.get('/characters'),
};

export default apiService;