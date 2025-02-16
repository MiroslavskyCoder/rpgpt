# rpgpt/image_gen.py
from diffusers import StableDiffusionPipeline
from PIL import Image
import torch
from .lora import LoraController
from config import DEFAULT_IMAGE_WIDTH, DEFAULT_IMAGE_HEIGHT, DEFAULT_NEGATIVE_PROMPT, IMAGE_MODEL_NAME, LORA_MODELS, VAE_IN_SIZE, VAE_OUT_SIZE

class ImageGenerator:
    def __init__(self):
        self.pipe = None
        self.lora_controller = LoraController(LORA_MODELS)

    def generate_image_stable_diffusion_local(self, prompt, negative_prompt=DEFAULT_NEGATIVE_PROMPT, width=DEFAULT_IMAGE_WIDTH, height=DEFAULT_IMAGE_HEIGHT, num_inference_steps=25, guidance_scale=7.5, cfg_scale=7.0):
        try:
            if self.pipe is None:
                print("Loading Stable Diffusion pipeline...")
                self.pipe = StableDiffusionPipeline.from_pretrained(
                    IMAGE_MODEL_NAME,  # You can change the model here
                    torch_dtype=torch.float16,
                    #safety_checker=None, #Disable the check to improve speed.
                ).to("cuda")
                print("Pipeline loaded successfully.")

            with torch.autocast("cuda"):
                image = self.pipe(
                    prompt,
                    negative_prompt=negative_prompt,
                    width=width,
                    height=height,
                    num_inference_steps=num_inference_steps,
                    guidance_scale=guidance_scale,
                ).images[0]
            return image
        except Exception as e:
            print(f"Error generating image: {e}")
            return None