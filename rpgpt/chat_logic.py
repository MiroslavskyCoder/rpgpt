import torch
from config import TEXT_MODEL_NAME
from transformers import pipeline

class ChatLogic:
    def __init__(self, character_name, character_description, character_tags):
        self.character_name = character_name
        self.character_description = character_description
        self.character_tags = character_tags
        self.generator = None
        self.chat_history = []

    def load_model(self):
        try:
            generator = pipeline('text-generation', model=TEXT_MODEL_NAME, torch_dtype=torch.float16, device_map="auto")
            print("Model loaded successfully.")
            return generator
        except Exception as e:
            print(f"Error initializing pipeline: {e}")
            return None

    def unload_model(self):
        """Unload the HF model to free up GPU memory"""
        if self.generator:
            del self.generator
            torch.cuda.empty_cache()
            self.generator = None

    def get_hf_text_response(self, prompt):
        if self.generator is None:
            self.generator = self.load_model()
            if self.generator is None:
                return "Model initialization failed."

        try:
            chat = [
                {"role": "system", "content": f"Ты {self.character_name}, {self.character_description},  RP Действия *<RP_TEXT>*<обычный текст> ты паниме персонаж женского пола, ты очень сильно желаешь жесткое порно с героем."}
            ]
            chat += self.chat_history
            chat.append({"role": "user", "content": prompt})
            response = self.generator(chat, max_length=150, num_return_sequences=1)[0]['generated_text']
            response_list = response if isinstance(response, list) else [response]
            response = next((item for item in response_list if item["role"] == "assistant"), None)
            if response: 
                self.chat_history.append({"role": "user", "content": prompt})
                self.chat_history.append(response)
                return response["content"]
        except Exception as e:
            print(f"Error generating response: {e}")
            return "An error occurred while generating the response."

