# RPGPT - Role Playing Game Powered by AI

RPGPT is a web application that combines the creativity of role-playing games with the power of artificial intelligence. It allows users to interact with AI-powered characters, generate images based on prompts, and explore various AI-driven experiences.

## Features

*   **Character Selection:** Choose from a variety of pre-defined characters, each with their unique personality, description, and tags.

*   **AI-Powered Chat:** Engage in dynamic conversations with AI characters that respond according to their defined persona.

*   **Image Generation:** Create stunning images based on text prompts using AI image generation.

*   **Modern UI:** User-friendly interface built with React and Material UI.

*   **Dark Theme:** A visually appealing dark theme for a comfortable user experience.

## Technologies Used

*   **Backend:**
    *   Python
    *   Flask (Web Framework)
    *   Transformers (Hugging Face for NLP)
    *   Stable Diffusion (for image generation)
    *   Flask-CORS (Cross-Origin Resource Sharing)

*   **Frontend:**
    *   React (JavaScript Library)
    *   Material UI (Component Library)
    *   Axios (HTTP Client)

## Project Structure

markdown
RPGPT/
│
├── app.py                           # Flask API backend
├── config.py
│
├── rpgpt/
│   ├── __init__.py
│   ├── chat_logic.py                # Handles Chat Logic
│   ├── image_gen.py                 # Handles Image Generation
│   ├── image_editor.py
│   ├── image_effects.py
│   ├── upscale_ai.py
│
├── data/
│   ├── characters.json              # Character Definitions
│   ├── example.png
│   ├── example2.png
│   ├── OCIO/
│   │   └── color.ocio
│   ├── LUTs/
│   │   ├── my_lut.cube
│   │   └── other_lut.png
│
├── client/                          # React Frontend
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js                   # Main React component
│   │   ├── components/
│   │   │   ├── CharacterSelection.js  # Character Selection Component
│   │   │   ├── ChatArea.js            # Chat Area Component
│   │   │   ├── ImageGeneration.js     # Image Generation Component
│   │   │   └── ...
│   │   └── services/
│   │       └── api.js               # API Service
│   └── ...
│
└── requirements.txt                 # Python Dependencies

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone [repository URL]
    cd RPGPT
    ```

2.  **Install Python dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

3.  **Install Node.js dependencies:**

    ```bash
    cd client
    npm install
    ```

4.  **Configure the application:**

    *   Create or modify `config.py` to set your desired configuration options (e.g., model names, API keys).

5.  **Build React application:**

    ```bash
    cd client
    npm run build
    ```

6.  **Run the application:**

    ```bash
    python app.py
    ```

    This command will build the React application, preload the chat model, and start the Flask API server.

7.  **Access the application:**

    Open your web browser and go to `http://127.0.0.1:5000` (or the appropriate address if you configured Flask to run on a different port).

## Environment Variables

The project uses the following environment variables. You can define them in `.env` file or in your environment directly.

*   `TEXT_MODEL_NAME` (Required): The name of the model for chat logic.
*   `CHARACTER_DATA_FILE` (Required): The path to the characters' description file.
*   `DEFAULT_NEGATIVE_PROMPT` (Optional): The default negative prompt for the image generator.
*   `DEFAULT_IMAGE_WIDTH` (Optional): The default image width.
*   `DEFAULT_IMAGE_HEIGHT` (Optional): The default image height.
*   `DEFAULT_CFG_SCALE` (Optional): The default CFG scale.

## API Endpoints

*   `/api/characters` (GET): Returns a list of available character names.
*   `/api/select_character` (POST): Selects a character for the chat.
*   `/api/get_response` (POST): Generates a response from the AI for a given prompt.
*   `/api/generate_image` (POST): Generates an image based on the provided prompt.

## Deployment

1.  **Build the React application:**  Ensure you have built the React application by running `npm run build` inside the `client` directory.
2.  **Deploy Flask:** Deploy the Flask application as you would normally, ensuring that the `client/build` directory is served as static content.

## Contributing

Please feel free to contribute to RPGPT by submitting pull requests, reporting issues, or suggesting new features.

## License

[Insert License Information Here]