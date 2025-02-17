# rpgpt/routers/api.py
from flask import Blueprint, request, jsonify
from rpgpt.chat_logic import ChatLogic
from rpgpt.image_gen import ImageGenerator
import torch
import logging
import json
from config import CHARACTER_DATA_FILE  # Import the character data file path
from rpgpt.versions import get_git_version, get_torch_version, get_torch_cuda_available, get_torch_cuda_device_count, get_flask_version, get_python_version, get_pil_version, get_nodejs_version, get_rpgpt_version

# Get the logger instance
logger = logging.getLogger(__name__)

api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.route('/versions', methods=['GET'])
def get_info():
    """
    Returns information about PyTorch.
    """
    try:
        versions = {
            "torch": get_torch_version(),
            "cuda_available": get_torch_cuda_available(),
            "cuda_device_count": get_torch_cuda_device_count(),
            "nodejs": get_nodejs_version(),
            "python": get_python_version(),
            "flask": get_flask_version(),
            "PIL": get_pil_version(),
            "rpgpt": get_rpgpt_version(),
            "git": get_git_version()
        }
        return jsonify(versions)
    except Exception as e:
        logger.exception("Error while getting versions")
        return jsonify({"error": "Failed to retrieve version information."}), 500

@api_bp.route('/chat', methods=['POST'])
def chat():
    """
    Handles chat requests using the ChatLogic class.
    """
    try:
        data = request.get_json()
        if not data or 'prompt' not in data:
            return jsonify({"error": "Prompt is required in the request body."}), 400

        prompt = data['prompt']
        character_name = data.get('character_name', 'Default')
        character_description = data.get('character_description', 'A helpful AI.')

        # Validation
        if not isinstance(prompt, str):
            return jsonify({"error": "Prompt must be a string."}), 400

        chat_logic = ChatLogic(character_name, character_description)
        response = chat_logic.get_hf_text_response(prompt)

        return jsonify({"response": response})

    except Exception as e:
        logger.exception("Error processing chat request")
        return jsonify({"error": "An error occurred while processing the chat request."}), 500

@api_bp.route('/image', methods=['POST'])
def generate_image():
    """
    Generates an image based on a prompt using the ImageGenerator class.
    """
    try:
        data = request.get_json()
        if not data or 'prompt' not in data:
            return jsonify({"error": "Prompt is required in the request body."}), 400

        prompt = data['prompt']

        # Validation
        if not isinstance(prompt, str):
            return jsonify({"error": "Prompt must be a string."}), 400

        image_generator = ImageGenerator()
        image = image_generator.generate_image_stable_diffusion_local(prompt)

        if image:
            # Save image and return URL
            image_path = "client/public/images/generated_image.png"
            image.save(image_path)
            image_url = "/images/generated_image.png"
            return jsonify({"image_url": image_url})
        else:
            return jsonify({"error": "Image generation failed."}), 500

    except Exception as e:
        logger.exception("Error generating image")
        return jsonify({"error": "An error occurred while generating the image."}), 500

@api_bp.route('/characters', methods=['GET'])
def get_characters():
    """
    Returns the character data from the specified JSON file.
    """
    try:
        with open(CHARACTER_DATA_FILE, 'r', encoding='utf-8') as f:
            character_data = json.load(f)
        return jsonify(character_data)
    except FileNotFoundError:
        logger.error(f"Character data file not found: {CHARACTER_DATA_FILE}")
        return jsonify({"error": "Character data file not found."}), 404
    except json.JSONDecodeError as e:
        logger.error(f"Error decoding JSON from character data file: {e}")
        return jsonify({"error": "Error decoding character data JSON."}), 500
    except Exception as e:
        logger.exception("Error while getting character data")
        return jsonify({"error": "An error occurred while retrieving character data."}), 500