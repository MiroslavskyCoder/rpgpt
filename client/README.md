# RPGPT Frontend - React Application

This directory contains the React frontend application for RPGPT, a web application powered by AI. The frontend provides the user interface for interacting with AI-powered characters, generating images, and exploring various features of the RPGPT project.

## Technologies Used

*   **React:** JavaScript library for building user interfaces.
*   **Material UI:** Component library for React, providing pre-built UI components.
*   **Axios:** HTTP client for making API requests to the backend.

## Project Structure

client/
========

### Directories

| Directory | Description |
| --- | --- |
| `public/` | Static assets (HTML, images, etc.) |
| `src/` | Source code for React components and logic |

### Subdirectories

#### `public/`

| File | Description |
| --- | --- |
| `index.html` | Main HTML file |
| `…` | Other static assets |

#### `src/`

| Directory | Description |
| --- | --- |
| `components/` | React components |
| `services/` | API service |
| `App.js` | Main application component |
| `index.js` | Entry point for the application |
| `…` | Other source code |

#### `package.json`

| Field | Description |
| --- | --- |
| `dependencies` | Node.js dependencies |
| `scripts` | Scripts for building and running the application |

#### `.gitignore`

| Pattern | Description |
| --- | --- |
| `node_modules/` | Node.js dependencies |
| `…` | Other files and directories to ignore |

## Setup Instructions

1.  **Navigate to the `client` directory:**

    ```bash
    cd client
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm start
    ```

    This will start the React development server and open the application in your default web browser (usually at `http://localhost:3000`).

4.  **Build for production:**

    ```bash
    npm run build
    ```

    This command will create a production-ready build of the React application in the `build` directory.  This directory should be served by your web server.

## Components

*   **`src/components/ChatArea.js`:**  This component handles the chat interface, allowing users to send messages and view AI responses.
*   **`src/components/ImageGenerator.js`:** This component handles image generation, providing an interface for users to input prompts and generate images.
*   **`src/components/CharacterSelection.js`:** This component handles character selection, allowing users to choose from a list of available characters.
*   **`src/services/api.js`:**  This file defines functions for making API requests to the backend (Flask API).
*   **`src/App.js`:**  The main application component, which orchestrates the overall structure of the application.
*   **`src/index.js`:**  The entry point for the React application.

## API Service (`src/services/api.js`)

The `api.js` file contains functions for communicating with the Flask backend API.  It uses `axios` to make HTTP requests. Key functions include:

*   `getChatResponse(prompt, userId, chatHistory, ...)`: Sends a user prompt to the `/api/chat` endpoint and receives an AI response.  Includes user ID and chat history.
*   `generateImage(prompt)`: Sends a prompt to the `/api/image` endpoint and receives a generated image.
*   `getCharacters()`: Fetches a list of available characters from the `/api/characters` endpoint.
*   `getVersions()`: Fetches version information from the `/api/versions` endpoint.

## Styling

The React application uses Material UI for styling and component management.  You can customize the appearance of the application by modifying the Material UI theme or by overriding component styles.

## Contributing

Feel free to contribute to the frontend of RPGPT by:

*   Submitting pull requests with bug fixes or new features.
*   Reporting issues.
*   Suggesting improvements to the user interface or user experience.