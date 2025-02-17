from flask import Blueprint, request, jsonify, session
from rpgpt.chat_logic import ChatLogic
from rpgpt.image_gen import ImageGenerator
from rpgpt.versions import get_torch_version, get_torch_cuda_available, get_torch_cuda_device_count, get_nodejs_version, get_python_version, get_flask_version, get_pil_version, get_rpgpt_version, get_git_version
import torch
import logging
import json
from config import CHARACTER_DATA_FILE, USER_DATA_DIR
import os
import uuid
import platform
import sys
import flask
import PIL
import subprocess

logger = logging.getLogger(__name__)

api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.before_request
def before_request():
    if 'user_id' not in session:
        session['user_id'] = str(uuid.uuid4())
        logger.info(f"Generated a new user ID: {session['user_id']}")
 
@api_bp.route('/versions', methods=['GET'])
def get_versions():
    """
    Returns information about various versions.
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

@api_bp.route('/info', methods=['GET'])
def get_info():
    try:
        info = {
            "version": torch.__version__,
            "cuda_available": torch.cuda.is_available(),
            "cuda_device_count": torch.cuda.device_count()
        }
        return jsonify(info)
    except Exception as e:
        logger.exception("Error while getting PyTorch info")
        return jsonify({"error": "Failed to retrieve PyTorch information."}), 500

@api_bp.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        if not data or 'prompt' not in data:
            return jsonify({"error": "Prompt is required in the request body."}), 400

        prompt = data['prompt']
        user_id = session['user_id'] # Get the user ID from the session
        character_name = data.get('character_name', 'Default')
        character_description = data.get('character_description', 'A helpful AI.')

        character_style_of_speech = data.get('character_style_of_speech', 'Default style')
        character_catchphrases = data.get('character_catchphrases', ['Default catchphrase'])
        character_personality_traits = data.get('character_personality_traits', ['Default trait'])
        character_relationships = data.get('character_relationships', 'No relationships')
        character_nsfw_traits = data.get('character_nsfw_traits', ['Default NSFW trait'])
        character_allowed_topics = data.get('character_allowed_topics', ['Default allowed topic'])
        character_banned_topics = data.get('character_banned_topics', ['Default banned topic'])

        # Validation
        if not isinstance(prompt, str):
            return jsonify({"error": "Prompt must be a string."}), 400

        chat_logic = ChatLogic(
            character_name,
            character_description,
            character_style_of_speech,
            character_catchphrases,
            character_personality_traits,
            character_relationships,
            character_nsfw_traits,
            character_allowed_topics,
            character_banned_topics,
            user_id  # Pass the user ID to ChatLogic
        )
        response = chat_logic.get_hf_text_response(prompt)
        return jsonify({"response": response})

    except Exception as e:
        logger.exception("Error processing chat request")
        return jsonify({"error": "An error occurred while processing the chat request."}), 500

@api_bp.route('/image', methods=['POST'])
def generate_image():
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