import torch
from config import TEXT_MODEL_NAME
from transformers import pipeline

class ChatLogic:
    def __init__(self, character_name, character_description, character_style_of_speech, character_catchphrases, character_personality_traits, character_relationships, character_nsfw_traits, character_allowed_topics, character_banned_topics):
        self.character_name = character_name
        self.character_description = character_description
        self.character_style_of_speech = character_style_of_speech
        self.character_catchphrases = character_catchphrases
        self.character_personality_traits = character_personality_traits
        self.character_relationships = character_relationships
        self.character_nsfw_traits = character_nsfw_traits
        self.character_allowed_topics = character_allowed_topics
        self.character_banned_topics = character_banned_topics
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
            system_message = f"Ты {self.character_name}, {self.character_description}. "
            system_message += f"Стиль речи: {self.character_style_of_speech}. "
            system_message += f"Коронные фразы: {', '.join(self.character_catchphrases)}. "
            system_message += f"Черты характера: {', '.join(self.character_personality_traits)}. "
            system_message += f"Отношения: {', '.join(self.character_relationships)}. "
            system_message += f"NSFW черты: {', '.join(self.character_nsfw_traits)}. "
            system_message += f"Разрешенные темы: {', '.join(self.character_allowed_topics)}. "
            system_message += f"Запрещенные темы: {', '.join(self.character_banned_topics)}. "
            system_message += "*<RP Действия>* <обычный текст> ты аниме персонаж женского пола"

            chat = [{"role": "system", "content": system_message}]
            chat += self.chat_history
            chat.append({"role": "user", "content": prompt})
            response = self.generator(chat, max_length=150, num_return_sequences=1)[0]['generated_text']

            # Extract response text
            if isinstance(response, str):
                response_text = response.split(":")[-1].strip()
            else: # Assume it is a list of dictionaries
                response_text = response[0]['generated_text'].split(":")[-1].strip() # Access generated_text
            
            self.chat_history.append({"role": "user", "content": prompt})
            self.chat_history.append({"role": "assistant", "content": response_text})
            return response_text

        except Exception as e:
            print(f"Error generating response: {e}")
            return "An error occurred while generating the response."