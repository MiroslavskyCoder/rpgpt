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
RPGPT/
<table>
  <tr>
    <th>Path</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>app.py</td>
    <td>Flask API backend</td>
  </tr>
  <tr>
    <td>config.py</td>
    <td></td>
  </tr>
  <tr>
    <td>rpgpt/</td>
    <td></td>
  </tr>
  <tr>
    <td>rpgpt/__init__.py</td>
    <td></td>
  </tr>
  <tr>
    <td>rpgpt/chat_logic.py</td>
    <td>Handles Chat Logic</td>
  </tr>
  <tr>
    <td>rpgpt/image_gen.py</td>
    <td>Handles Image Generation</td>
  </tr>
  <tr>
    <td>rpgpt/image_editor.py</td>
    <td></td>
  </tr>
  <tr>
    <td>rpgpt/image_effects.py</td>
    <td></td>
  </tr>
  <tr>
    <td>rpgpt/upscale_ai.py</td>
    <td></td>
  </tr>
  <tr>
    <td>data/</td>
    <td></td>
  </tr>
  <tr>
    <td>data/characters.json</td>
    <td>Character Definitions</td>
  </tr>
  <tr>
    <td>data/example.png</td>
    <td></td>
  </tr>
  <tr>
    <td>data/example2.png</td>
    <td></td>
  </tr>
  <tr>
    <td>data/OCIO/</td>
    <td></td>
  </tr>
  <tr>
    <td>data/OCIO/color.ocio</td>
    <td></td>
  </tr>
  <tr>
    <td>data/LUTs/</td>
    <td></td>
  </tr>
  <tr>
    <td>data/LUTs/my_lut.cube</td>
    <td></td>
  </tr>
  <tr>
    <td>data/LUTs/other_lut.png</td>
    <td></td>
  </tr>
  <tr>
    <td>client/</td>
    <td>React Frontend</td>
  </tr>
  <tr>
    <td>client/package.json</td>
    <td></td>
  </tr>
  <tr>
    <td>client/public/</td>
    <td></td>
  </tr>
  <tr>
    <td>client/public/index.html</td>
    <td></td>
  </tr>
  <tr>
    <td>client/src/</td>
    <td></td>
  </tr>
  <tr>
    <td>client/src/App.js</td>
    <td>Main React component</td>
  </tr>
  <tr>
    <td>client/src/components/</td>
    <td></td>
  </tr>
  <tr>
    <td>client/src/components/CharacterSelection.js</td>
    <td>Character Selection Component</td>
  </tr>
  <tr>
    <td>client/src/components/ChatArea.js</td>
    <td>Chat Area Component</td>
  </tr>
  <tr>
    <td>client/src/components/ImageGeneration.js</td>
    <td>Image Generation Component</td>
  </tr>
  <tr>
    <td>client/src/components/...</td>
    <td></td>
  </tr>
  <tr>
    <td>client/src/services/</td>
    <td></td>
  </tr>
  <tr>
    <td>client/src/services/api.js</td>
    <td>API Service</td>
  </tr>
  <tr>
    <td>client/...</td>
    <td></td>
  </tr>
  <tr>
    <td>requirements.txt</td>
    <td>Python Dependencies</td>
  </tr>
</table>

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