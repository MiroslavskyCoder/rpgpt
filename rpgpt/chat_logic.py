import torch
from config import TEXT_MODEL_NAME, USER_DATA_DIR
from transformers import pipeline
import logging
import json
import os

class ChatLogic:
    def __init__(self, character_name, character_description, character_style_of_speech, character_catchphrases, character_personality_traits, character_relationships, character_nsfw_traits, character_allowed_topics, character_banned_topics, user_id, chat_history=None):
        self.character_name = character_name
        self.character_description = character_description
        self.character_style_of_speech = character_style_of_speech
        self.character_catchphrases = character_catchphrases
        self.character_personality_traits = character_personality_traits
        self.character_relationships = character_relationships
        self.character_nsfw_traits = character_nsfw_traits
        self.character_allowed_topics = character_allowed_topics
        self.character_banned_topics = character_banned_topics
        self.user_id = str(user_id)
        self.generator = None
        self.chat_history = chat_history if chat_history is not None else self.load_history() # Set chat history during init
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.system_message = self.create_system_message()  # Create system message on init
        logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

    def _get_history_file_path(self):
        """Returns the file path for storing the chat history for this user."""
        filename = f"{self.user_id}_chat_history.json"
        filepath = os.path.join(USER_DATA_DIR, filename)
        return filepath

    def load_history(self):
        """Loads the chat history from a file."""
        filepath = self._get_history_file_path()
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                history = json.load(f)
                logging.info(f"Chat history loaded successfully from {filepath}")
                return history
        except FileNotFoundError:
            logging.info(f"No chat history file found for user {self.user_id}. Starting new history.")
            return []  # Start with an empty history
        except json.JSONDecodeError:
            logging.error(f"Corrupted chat history file found for user {self.user_id}. Starting new history.")
            return [] # Start with an empty history

    def save_history(self):
        """Saves the chat history to a file."""
        filepath = self._get_history_file_path()
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(self.chat_history, f, ensure_ascii=False, indent=4)
                logging.info(f"Chat history saved successfully to {filepath}")
        except Exception as e:
            logging.error(f"Error saving chat history to {filepath}: {e}", exc_info=True)

    def create_system_message(self):
        """Creates the system message with character information."""
        system_message = f"Ты {self.character_name or 'безымянный персонаж'}, {self.character_description or 'полезный AI'}."
        system_message += f" Стиль речи: {self.character_style_of_speech or 'обычный стиль'}."
        system_message += f" Коронные фразы: {', '.join(self.character_catchphrases) if self.character_catchphrases else 'нет'}."
        system_message += f" Черты характера: {', '.join(self.character_personality_traits) if self.character_personality_traits else 'нет'}."
        system_message += f" Отношения: {self.character_relationships or 'нет'}."
        system_message += f" NSFW черты: {', '.join(self.character_nsfw_traits) if self.character_nsfw_traits else 'нет'}."
        system_message += f" Разрешенные темы: {', '.join(self.character_allowed_topics) if self.character_allowed_topics else 'нет'}."
        system_message += f" Запрещенные темы: {', '.join(self.character_banned_topics) if self.character_banned_topics else 'нет'}."
        system_message += " *<RP Действия>* <обычный текст> ты аниме персонаж женского пола"
        return system_message

    def load_model(self):
        try:
            logging.info(f"Loading model {TEXT_MODEL_NAME} on device {self.device}")
            self.generator = pipeline('text-generation', model=TEXT_MODEL_NAME, torch_dtype=torch.float16, device=self.device)
            logging.info("Model loaded successfully.")
        except Exception as e:
            logging.error(f"Error initializing pipeline: {e}", exc_info=True)
            return None
        return self.generator

    def unload_model(self):
        """Unload the HF model to free up GPU memory"""
        if self.generator:
            del self.generator
            torch.cuda.empty_cache()
            self.generator = None
            logging.info("Model unloaded successfully.")

    def get_hf_text_response(self, prompt):
        if not prompt:
            logging.warning("Prompt is empty.")
            return "Please provide a valid prompt."

        if self.generator is None:
            self.generator = self.load_model()
            if self.generator is None:
                return "Model initialization failed."

        try:
            # Format the input text for the model
            system_message = self.create_system_message()
            chat = [
                {
                    "role": "system",
                    "content": system_message
                }
            ]

            # Append the chat history after the system message
            chat.extend(self.chat_history)

            # Append the user's prompt
            chat.append({"role": "user", "content": prompt})
            logging.info(f"Full input text sent to model: {chat}")

            # Pass only the chat (history and prompt) to the model
            output = self.generator(chat, max_length=4500, num_return_sequences=1)

            logging.info(f"Raw model output: {output}") #Log model output

            if isinstance(output, list) and len(output) > 0:
                first_element = output[0] # Get the first element of the list

                if isinstance(first_element, dict) and 'generated_text' in first_element:
                    generated_content = first_element['generated_text'] # Access the list of dictionaries

                    if isinstance(generated_content, list) and len(generated_content) > 0:
                        response_text = generated_content[-1].get('content', "The model returned an empty sequence.")
                        logging.info(f"Extracted Response Text: {response_text}")
                    else:
                        response_text = "The model returned an empty sequence."
                        logging.warning("Model returned an empty or malformed sequence.")
                else:
                    response_text = "The model returned an empty sequence."
                    logging.warning("Model returned an empty or malformed sequence.")
            else:
                response_text = "The model returned an empty response."
                logging.warning("Model returned an empty or malformed sequence.")


            # Append chat history (cleanly)
            self.update_history({"role": "user", "content": prompt})
            self.update_history({"role": "assistant", "content": response_text})

            return response_text

        except Exception as e:
            logging.exception(f"Error generating response: {e}", exc_info=True)
            return f"An error occurred while generating the response: {e}"
        
    def update_history(self, new_message):
        """Updates the chat history with a new message, handling potential size limits and saving the history."""
        self.chat_history.append(new_message)
        # Optional: Keep history at a reasonable size to avoid excessive memory use.
        if len(self.chat_history) > 20:  # Keep the last 20 turns (user + assistant)
            self.chat_history = self.chat_history[-20:]
        self.save_history() # Save history after each update