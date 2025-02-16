import torch

from config import TEXT_MODEL_NAME

class ChatLogic:
    def __init__(self, character_name, character_description, character_tags):
        self.character_name = character_name
        self.character_description = character_description
        self.character_tags = character_tags
        self.generator = None # Initialize generator to None
    def load_model(self):
        try:
            from transformers import pipeline
            generator = pipeline('text-generation', model=TEXT_MODEL_NAME, torch_dtype=torch.float16, device_map="auto")
            print("Model loaded successfully.")
            return generator
        except Exception as e:
            print(f"Error initializing pipeline: {e}")
            return None

    def unload_model(self):
        if self.generator:
            del self.generator
            torch.cuda.empty_cache() # Clear GPU cache
            self.generator = None

    def get_hf_text_response(self, prompt):
        if self.generator is None:
            self.generator = self.load_model()
            if self.generator is None:
                return "Model initialization failed."
        # Build Prompt
        full_prompt = f"{self.character_description}\n{self.character_name}: {prompt}"

        # Generate Response
        response = self.generator(full_prompt, max_length=150, num_return_sequences=1)[0]['generated_text']

        # Extract Response
        response_text = response.split(":")[-1].strip()
        return response_text