# RPGPT - Role Playing Game Powered by AI

RPGPT is a web application that merges the creativity of role-playing games with the power of artificial intelligence. It allows users to engage with AI-driven characters, generate images based on text prompts, and explore a variety of AI-enhanced experiences.

## Features

*   **Character Selection:** Choose from a diverse selection of pre-defined characters, each with a unique personality, detailed description, and relevant tags.
*   **AI-Powered Chat:** Engage in dynamic and engaging conversations with AI characters that respond in character, reflecting their defined persona.
*   **Image Generation:** Create stunning and imaginative images based on text prompts using AI image generation.  Leverages Stable Diffusion for high-quality results.
*   **User Authentication (Optional):**  Support for user accounts and session management (implemented with Flask-Session).
*   **Chat History:** The system saves and loads user chat histories, enhancing the interactive experience and allowing for continued conversations.
*   **Modern UI:** User-friendly interface built with React and Material UI, providing a seamless and intuitive experience.
*   **Dark Theme:** Includes a visually appealing dark theme for a comfortable user experience.
*   **Version Information:**  Provides information about the versions of key libraries used in the project via the `/api/versions` endpoint.

## Technologies Used

*   **Backend:**
    *   Python 3.9+
    *   Flask (Web Framework)
    *   PyTorch (Machine Learning Framework)
    *   Hugging Face Transformers (for NLP and chatbot models)
    *   Stable Diffusion (for image generation)
    *   Flask-CORS (Cross-Origin Resource Sharing)
    *   Flask-Session (for user session management)
    *   Gunicorn (WSGI server for production deployment)
    *   Pillow (PIL) (for image manipulation)
    *   UUID (for generating unique identifiers)
    *   subprocess (for version retrieval of some components)

*   **Frontend:**
    *   React (JavaScript Library)
    *   Material UI (Component Library)
    *   Axios (HTTP Client)

## Project Structure

<table>
  <tr>
    <th>Directory/File</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>rpgpt/</td>
    <td>Root directory</td>
  </tr>
  <tr>
    <td>app.py</td>
    <td>Main Flask application file (entry point)</td>
  </tr>
  <tr>
    <td>chat_logic.py</td>
    <td>Logic for the AI chatbot interactions</td>
  </tr>
  <tr>
    <td>image_gen.py</td>
    <td>Image generation functionality</td>
  </tr>
  <tr>
    <td>routers/</td>
    <td>Directory containing API endpoint definitions</td>
  </tr>
  <tr>
    <td>versions.py</td>
    <td>Contains functions for retrieving version information</td>
  </tr>
  <tr>
    <td>config.py</td>
    <td>Stores configuration parameters (e.g., model names, file paths)</td>
  </tr>
  <tr>
    <td>.version</td>
    <td>File containing the project version</td>
  </tr>
  <tr>
    <td>requirements.txt</td>
    <td>Lists Python dependencies</td>
  </tr>
  <tr>
    <td>gunicorn.conf.py</td>
    <td>Configuration file for Gunicorn</td>
  </tr>
  <tr>
    <td>venv.py</td>
    <td>Script for creating and managing the virtual environment</td>
  </tr>
  <tr>
    <td>user_data/</td>
    <td>Directory for storing user-specific data (e.g., chat histories)</td>
  </tr>
  <tr>
    <td>client/</td>
    <td>React frontend application</td>
  </tr>
  <tr>
    <td>src/</td>
    <td>Source code for React components and logic</td>
  </tr>
  <tr>
    <td>public/</td>
    <td>Static assets (HTML, images, etc.)</td>
  </tr>
  <tr>
    <td>package.json</td>
    <td>Node.js dependencies</td>
  </tr>
  <tr>
    <td>…</td>
    <td>Other files and directories</td>
  </tr>
  <tr>
    <td>.gitignore</td>
    <td>Specifies intentionally untracked files that Git should ignore</td>
  </tr>
  <tr>
    <td>README.md</td>
    <td>This file (project documentation)</td>
  </tr>
</table>

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/MiroslavskyCoder/rpgpt
    cd rpgpt
    ```

2.  **Create and activate a virtual environment:**  *Important: Do this before installing any dependencies.*

    ```bash
    python venv.py  # Use the provided venv.py script
    ```
    (This will create a `.venv` directory and attempt to activate it.)

    *   **Windows:**  You may need to activate manually in a new terminal: `.venv\Scripts\activate`
    *   **Linux/macOS:** You may need to activate manually in a new terminal: `source .venv/bin/activate`

3.  **Install Python dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Install Node.js dependencies:**

    ```bash
    cd client
    npm install
    ```

5.  **Configure the application:**

    *   **Create a `.env` file** in the root directory of the project.  This file is *not* tracked by Git, so it's safe to store your secrets and environment-specific settings.  Add the following, replacing the placeholders with your actual values:

        ```
        TEXT_MODEL_NAME=YOUR_MODEL_NAME  # e.g., 'microsoft/DialoGPT-medium'
        CHARACTER_DATA_FILE=rpgpt/data/characters.json  # Path to your character data file
        # Optional settings (with sensible defaults)
        DEFAULT_NEGATIVE_PROMPT=ugly, deformed, blurry
        DEFAULT_IMAGE_WIDTH=512
        DEFAULT_IMAGE_HEIGHT=512
        DEFAULT_CFG_SCALE=7.5
        ```

    *   **Create a `data` directory** inside the `rpgpt` directory, if it doesn't exist.
    *   **Place your character data file** (specified by `CHARACTER_DATA_FILE` in `.env`) in the `data` directory (or adjust the path). The format should be JSON.
    *   **If using a local Stable Diffusion model**, make sure it is installed in a location accessible by your application and configure relevant paths/settings in `config.py` or `.env`.

6.  **Build the React application:**

    ```bash
    cd client
    npm run build
    ```

7.  **Run the application:**

    ```bash
    python app.py
    ```

    This command will:
    *   Load your React application
    *   Start the Flask API server.
    *   Load the specified chatbot model (this might take a moment).
    *   Preload the character data.

8.  **Access the application:**

    Open your web browser and navigate to `http://127.0.0.1:5000` (or the address and port specified in your Flask configuration, which defaults to 5000).

## Environment Variables

The project utilizes the following environment variables for configuration:

*   `TEXT_MODEL_NAME` (Required): Specifies the name of the pre-trained language model to use for the chatbot.  This is often a model from Hugging Face.  Example: `'microsoft/DialoGPT-medium'`
*   `CHARACTER_DATA_FILE` (Required): The path to a JSON file containing character data (descriptions, personalities, etc.). The path is relative to the project root.
*   `DEFAULT_NEGATIVE_PROMPT` (Optional): The default negative prompt used by the image generator (helps to avoid certain undesirable image features).
*   `DEFAULT_IMAGE_WIDTH` (Optional): The default width of generated images (in pixels).
*   `DEFAULT_IMAGE_HEIGHT` (Optional): The default height of generated images (in pixels).
*   `DEFAULT_CFG_SCALE` (Optional):  The default Classifier-Free Guidance (CFG) scale used by the image generator. A higher value generally makes the image more closely follow the prompt.

## API Endpoints

*   `/api/characters` (GET): Returns a JSON list of available character names.
*   `/api/chat` (POST): Accepts a user prompt in the request body (JSON) and returns the AI's response.  The request should also include the user_id and may include character-related parameters.
*   `/api/image` (POST): Generates an image based on a text prompt provided in the request body (JSON).
*   `/api/versions` (GET): Returns a JSON object containing version information for the Python environment, PyTorch, Flask, and other key components. This is useful for debugging and ensuring the correct environment is set up.

## Deployment

1.  **Build the React application:**  Ensure you have built the React application by running `npm run build` inside the `client` directory. The build output is typically placed in the `client/build` directory.
2.  **Choose a Deployment Strategy:** Consider the following options:
    *   **Serving Static Files with Flask:** You can configure Flask to serve the contents of the `client/build` directory as static content. This is a simpler approach for basic deployments.
    *   **Using a Web Server (Recommended for Production):** Deploy the Flask backend using a production-ready WSGI server like Gunicorn or uWSGI, and configure a reverse proxy such as Nginx or Apache to serve the static content (the React application) and handle routing. This approach offers better performance, scalability, and security.
3.  **Gunicorn Configuration:**  Create a `gunicorn.conf.py` (or similar) file to configure your Gunicorn deployment. Example:

    ```python
    # gunicorn.conf.py
    import os

    # Number of worker processes
    workers = os.cpu_count() * 2 + 1  # Or adjust based on your server's resources

    # Maximum requests per worker
    max_requests = 1000

    # Request timeout (in seconds)
    timeout = 30

    # Bind address
    bind = "0.0.0.0:5000"  # Or your desired address and port

    # Logging (adjust paths as needed)
    accesslog = '/var/log/rpgpt/access.log'
    errorlog = '/var/log/rpgpt/error.log'

    # Log level
    loglevel = 'info'

    # Static files (If using Flask to serve static files)
    #  Use a reverse proxy like Nginx to serve static files for best performance
    #  Alternatively, use a tool like Whitenoise
    #  This will serve the client/build directory under the root
    #  from flask import Flask
    #  from flask import send_from_directory
    #  app = Flask(__name__, static_folder='client/build')
    #  @app.route("/")
    #  def index():
    #      return send_from_directory(app.static_folder, 'index.html')
    ```

4.  **Reverse Proxy (Nginx Example):** If you're using Nginx, your configuration might look like this:

    ```nginx
    # /etc/nginx/sites-available/rpgpt

    server {
        listen 80;
        server_name your_domain.com;  # Replace with your domain

        location / {
            root /path/to/your/rpgpt/client/build;  # Path to the React build output
            index index.html index.htm;
            try_files $uri $uri/ /index.html; # Important for React routing
        }

        location /api {
            proxy_pass http://127.0.0.1:5000;  # Forward API requests to Flask
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
    ```
    Replace `/path/to/your/rpgpt/client/build` and `your_domain.com` with your actual paths and domain.

5.  **Run Gunicorn (Example):**

    ```bash
    gunicorn --config gunicorn.conf.py app:app
    ```
    Where `app:app` points to your Flask application (e.g., if your main file is `app.py` and your Flask app is called `app`).  You might use a process manager like systemd to keep Gunicorn running in the background.

## Contributing

Contributions to RPGPT are welcome!  Please feel free to:

*   Submit pull requests with code improvements, bug fixes, and new features.
*   Report issues and bugs you encounter.
*   Suggest new features and enhancements.

Please follow the existing code style and project structure.  Make sure to include tests for any new functionality.
 