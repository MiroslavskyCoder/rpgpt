import torch

class LoraController:
    def __init__(self, lora_models):
        self.lora_models = lora_models

    def list_lora_models(self):
        return self.lora_models

    def get_lora_model(self, name):
        for lora in self.lora_models:
            if lora["name"] == name:
                return lora
        return None

    def unload_lora_model(self, name):
        for i, lora in enumerate(self.lora_models):
            if lora["name"] == name:
                del self.lora_models[i]
                return
        print(f"LoRA model not found: {name}")

    def load_lora_model(self, name):
        try:
            lora = torch.load(name, map_location=torch.device('cuda'))
            self.lora_models.append(lora)
            print(f"Loaded LoRA model: {name}")
        except Exception as e:
            print(f"Error loading LoRA model: {e}")
