import os
os.environ['HF_HOME'] = './.cache'

# app.py
from flask import Flask, request, jsonify, send_from_directory, Response
import os
import json
import subprocess
from flask_cors import CORS
from rpgpt.chat_logic import ChatLogic
from rpgpt.image_gen import ImageGenerator
from rpgpt.routers import api_bp  # Import the blueprint
from config import CHARACTER_DATA_FILE, DEFAULT_NEGATIVE_PROMPT, DEFAULT_IMAGE_WIDTH, DEFAULT_IMAGE_HEIGHT, DEFAULT_CFG_SCALE
import time  # Import time module for simulating progress
import threading

app = Flask(__name__, static_folder='client/build', static_url_path='/')
CORS(app)

# Load Character Data
try:
    with open(CHARACTER_DATA_FILE, 'r', encoding='utf-8') as f:
        character_data = json.load(f)
except Exception as e:
    print(f"Error loading character {e}")
    character_data = []

# Initialize Image Generator
print("Preloading ImageGenerator model...")
try:
    global_image_generator = ImageGenerator()
    print("ImageGenerator model preloaded successfully.")
except Exception as e:
    global_image_generator = None
    print(f"Failed to preload ImageGenerator model: {e}. The application may not work correctly.")

# Preload ChatLogic model
print("Preloading ChatLogic model...")
try:
    global_chat_logic_model = ChatLogic.load_model()
    if global_chat_logic_model is None:
        raise Exception("Failed to preload ChatLogic model: load_model return None")
    print("ChatLogic model preloaded successfully.")
except Exception as e:
    global_chat_logic_model = None
    print(f"Failed to preload ChatLogic model: {e}. The application may not work correctly.")

selected_character = None
chat_logic = None

app.register_blueprint(api_bp)

@app.route('/')
def index():
    return app.send_static_file('index.html')

def build_react_app():
    npm_path = None

    if "ProgramFiles" in os.environ:
        npm_path = os.path.join(os.environ["ProgramFiles"], "nodejs", "npm.cmd")
        if not os.path.exists(npm_path):
            npm_path = None
    if "ProgramFiles(x86)" in os.environ and npm_path is None:
        npm_path = os.path.join(os.environ["ProgramFiles(x86)"], "nodejs", "npm.cmd")
        if not os.path.exists(npm_path):
            npm_path = None

    if npm_path is None:
        print("npm not found in standard Program Files locations.  Assuming it is in your PATH.")
        npm_path = "npm"

    try:
        subprocess.run([npm_path, "install"], cwd="client", check=True)
        subprocess.run([npm_path, "run", "build"], cwd="client", check=True)
        print("React app built successfully!")
    except subprocess.CalledProcessError as e:
        print(f"Error building React app: {e}")
        exit(1)
    except FileNotFoundError as e:
        print(f"Could not find npm executable: {e}")
        exit(1)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        exit(1)

if __name__ == '__main__':
    # Build React app before starting Flask
    print("Building React app...")
    build_react_app()

    print("Starting Flask app...")
    app.run(debug=False) #set Debug True or False
