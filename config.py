# config.py
import os

# Text Model Configuration
TEXT_MODEL_NAME = "Qwen/Qwen2.5-Coder-32B-Instruct" # Default text generation model
# microsoft/Phi-3.5-mini-instruct

# Image Model Configuration
IMAGE_MODEL_NAME = "stabilityai/stable-diffusion-2-1" #Default Stable Diffusion v1.5
DEFAULT_IMAGE_WIDTH = 512 # Default image width
DEFAULT_IMAGE_HEIGHT = 512 # Default image height
DEFAULT_CFG_SCALE = 7.5 # Default CFG scale
DEFAULT_SEED = None # Default seed, set to None for random seed
DEFAULT_NEGATIVE_PROMPT = "ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, mutation, mutated, extra limbs, disfigured, deformed, body out of frame, bad art, bad anatomy, blurry, blurred, watermark, grainy" # Default negative prompt

# File Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__)) # Base directory
CHAT_HISTORY_FILE = os.path.join(BASE_DIR, "data", "chat_history.json") # Chat history file
CHARACTER_DATA_FILE = os.path.join(BASE_DIR, "data", "characters.json") # Character data file
OCIO_CONFIG_PATH = os.path.join(BASE_DIR, "data", "OCIO", "color.ocio") # OCIO config file

# Feature Flags
ENABLE_TEXT_TO_SPEECH = False # Enable or disable text to speech
ENABLE_IMAGE_EDITOR = True # Enable or disable image editor

# LORA Configuration
LORA_MODELS = [] # List of LORA models to choose from
VAE_IN_SIZE = 512 # Input size of VAE
VAE_OUT_SIZE = 512 # Output size of VAE

# Default Character Data (if file is missing or empty)
DEFAULT_CHARACTERS = {
    "default": {
        "name": "Default Character",
        "description": "A generic character.",
        "tags": ["generic", "neutral"]
    }
}