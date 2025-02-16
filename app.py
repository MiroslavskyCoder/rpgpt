# app.py
from flask import Flask, request, jsonify, send_from_directory, Response
import os
import json
import subprocess
from flask_cors import CORS
from rpgpt.chat_logic import ChatLogic
from rpgpt.image_gen import ImageGenerator
from config import CHARACTER_DATA_FILE, DEFAULT_NEGATIVE_PROMPT, DEFAULT_IMAGE_WIDTH, DEFAULT_IMAGE_HEIGHT, DEFAULT_CFG_SCALE
import time  # Import time module for simulating progress
import threading

app = Flask(__name__, static_folder='client/build', static_url_path='/')
CORS(app)

# Load Character Data
with open(CHARACTER_DATA_FILE, 'r') as f:
    character_data = json.load(f)

# Initialize Image Generator
image_generator = ImageGenerator()

selected_character = None
chat_logic = None

# SSE Route
def generate_image_process(prompt, negative_prompt, width, height, cfg_scale):
    def event_stream():
        try:
            # Simulate image generation with progress updates
            for i in range(101):
                time.sleep(0.1)  # Simulate work
                yield f"{json.dumps({'progress': i})}\n\n"

            image = image_generator.generate_image_stable_diffusion_local(prompt, negative_prompt, width, height, cfg_scale)
            if image:
                image_path = "client/public/images/generated_image.png"
                image.save(image_path)
                image_url = "/images/generated_image.png"
                yield f"{json.dumps({'image_url': image_url})}\n\n"
            else:
                yield f"{json.dumps({'error': 'Failed to generate image'})}\n\n"

        except Exception as e:
            yield f"{json.dumps({'error': str(e)})}\n\n"

    return Response(event_stream(), mimetype="text/event-stream")

@app.route('/api/generate_image_sse', methods=['POST'])
def generate_image_sse():
    data = request.get_json()
    prompt = data['prompt']
    negative_prompt = data.get('negative_prompt', DEFAULT_NEGATIVE_PROMPT)
    width = int(data.get('width', DEFAULT_IMAGE_WIDTH))
    height = int(data.get('height', DEFAULT_IMAGE_HEIGHT))
    cfg_scale = float(data.get('cfg_scale', DEFAULT_CFG_SCALE))

    if not selected_character:
        return jsonify({"error": "No character selected."})

    thread = threading.Thread(target=generate_image_process, args=(prompt, negative_prompt, width, height, cfg_scale))

    thread.start()
    return generate_image_process(prompt, negative_prompt, width, height, cfg_scale) #returns Response object.

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/characters', methods=['GET'])
def get_characters():
    character_names = [character['name'] for character in character_data]
    return jsonify(character_names)

@app.route('/api/select_character', methods=['POST'])
def select_character():
    global selected_character, chat_logic
    character_name = request.json['character_name']
    selected_character = next((char for char in character_data if char['name'] == character_name), None)

    if selected_character:
        if chat_logic:
            chat_logic.unload_model()
            chat_logic = None

        chat_logic = ChatLogic(
            selected_character["name"],
            selected_character["description"],
            selected_character["tags"] if "tags" in selected_character else []
        )
        return jsonify({"status": "success", "message": f"Character {character_name} selected"})
    else:
        return jsonify({"status": "error", "message": "Character not found"})

@app.route('/api/get_response', methods=['POST'])
def get_response():
    global chat_logic
    prompt = request.json['prompt']
    if not selected_character:
        return jsonify({"response": "No character selected. Please select a character first."})

    try:
        if chat_logic is None:
            return jsonify({"response": "ChatLogic is not initialized properly."})

        response = chat_logic.get_hf_text_response(prompt)
        return jsonify({"response": response})
    except Exception as e:
        print(f"Error generating response: {e}")
        return jsonify({"response": f"An error occurred: {str(e)}"})

@app.route('/api/generate_image', methods=['POST'])
def generate_image():
    global image_generator
    data = request.get_json()
    prompt = data['prompt']
    negative_prompt = data.get('negative_prompt', DEFAULT_NEGATIVE_PROMPT)
    width = int(data.get('width', DEFAULT_IMAGE_WIDTH))
    height = int(data.get('height', DEFAULT_IMAGE_HEIGHT))
    cfg_scale = float(data.get('cfg_scale', DEFAULT_CFG_SCALE))

    if not selected_character:
        return jsonify({"error": "No character selected."})

    try:
        #image_generator = ImageGenerator()  # Initialize here
        image = image_generator.generate_image_stable_diffusion_local(prompt, negative_prompt, width, height, cfg_scale=cfg_scale)

        if image:
            image_path = "client/public/images/generated_image.png"
            image.save(image_path)
            image_url = "/images/generated_image.png"
            return jsonify({"image_url": image_url})
        else:
            return jsonify({"error": "Failed to generate image"})
    except Exception as e:
        print(f"Error generating image: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"})

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
    app.run(debug=False)