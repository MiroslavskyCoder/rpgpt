# RPGPT - Routers Directory README

This directory, `rpgpt/routers`, contains the code that defines the API endpoints for the RPGPT web application. It organizes the different routes (URLs) that the frontend can interact with to perform various actions, such as:

*   Chat with the AI-powered characters.
*   Generate images.
*   Retrieve character data.
*   Get version information.

## Structure

The primary file within this directory is `api.py`, which uses the Flask framework to define the API endpoints.

*   `api.py`: Contains the definitions for all API endpoints.  This is where the logic for handling requests and responses resides.  It imports from `chat_logic.py`, `image_gen.py`, and other relevant modules to handle the requests.

## Key API Endpoints

*   **`/api/characters` (GET):**
    *   **Purpose:** Retrieves a list of available character names and/or character data (description, etc.).
    *   **Handler:** `get_characters()` in `api.py`.
    *   **Input:** None.
    *   **Output:** JSON array of character names or character objects.

*   **`/api/chat` (POST):**
    *   **Purpose:** Handles chat requests, generates AI responses based on a user's prompt, and character information.
    *   **Handler:** `chat()` in `api.py`.
    *   **Input:** JSON object with the following fields (example):
        ```json
        {
            "prompt": "Hello, tell me a story.",
            "user_id": "some_unique_user_id",
            "chat_history": [
                {"role": "user", "content": "Previous message"},
                {"role": "assistant", "content": "Previous response"}
            ],
            "character_name": "Character Name",
            "character_description": "Character Description",
            "character_style_of_speech": "Character's Speech Style",
            "character_catchphrases": ["Phrase 1", "Phrase 2"],
            "character_personality_traits": ["Trait 1", "Trait 2"],
            "character_relationships": "Relationships Description",
            "character_nsfw_traits": ["NSFW 1", "NSFW 2"],
            "character_allowed_topics": ["Topic 1", "Topic 2"],
            "character_banned_topics": ["Banned 1", "Banned 2"]
        }
        ```
    *   **Output:** JSON object containing the AI-generated response:
        ```json
        {
            "response": "The AI's response text."
        }
        ```

*   **`/api/image` (POST):**
    *   **Purpose:** Generates an image based on a user's text prompt.
    *   **Handler:** `generate_image()` in `api.py`.
    *   **Input:** JSON object with a `prompt` field:
        ```json
        {
            "prompt": "A fantasy landscape with a dragon."
        }
        ```
    *   **Output:** JSON object containing the URL to the generated image:
        ```json
        {
            "image_url": "/images/generated_image.png"
        }
        ```

*   **`/api/versions` (GET):**
    *   **Purpose:** Returns version information for key components of the application.
    *   **Handler:** `get_versions()` in `api.py`.
    *   **Input:** None.
    *   **Output:** JSON object with version information:
        ```json
        {
            "torch": "1.13.1",
            "cuda_available": true,
            "cuda_device_count": 1,
            "nodejs": "v16.14.0",
            "python": "3.9.13",
            "flask": "2.3.3",
            "PIL": "9.2.0",
            "rpgpt": "0.1.0",
            "git": "a1b2c3d4"
        }
        ```

## Dependencies

This directory depends on the following modules:

*   `app.py` (at project root)
*   `chat_logic.py`
*   `image_gen.py`
*   `versions.py`
*   `config.py`

## Contributing

To contribute to the API endpoints:

1.  Create a new branch for your changes.
2.  Modify `api.py` (and potentially other related files).
3.  Add or update unit tests.
4.  Submit a pull request.