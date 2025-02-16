# rpgpt/image_gen.py
from diffusers import StableDiffusionPipeline
import torch
from config import IMAGE_MODEL_NAME, DEFAULT_IMAGE_WIDTH, DEFAULT_IMAGE_HEIGHT, DEFAULT_CFG_SCALE, DEFAULT_SEED, DEFAULT_NEGATIVE_PROMPT
import random

class ImageGenerator:
    def __init__(self):
        self.pipe = None
        self.device = "cuda" if torch.cuda.is_available() else "cpu" #Check for CUDA

        self.initialize_pipeline() # Load the pipeline

    def initialize_pipeline(self):
        try:
            self.pipe = StableDiffusionPipeline.from_pretrained(IMAGE_MODEL_NAME,
                                                        torch_dtype=torch.float16,
                                                        safety_checker=None).to(self.device) #Add parameters to config!


            #Enable optimizations, if on cuda.
            if self.device == "cuda":
                self.pipe.enable_model_offload()
                self.pipe.enable_xformers_memory_efficient_attention()

            print(f"Stable Diffusion Initialized on {self.device}")

        except Exception as e:
            print(f"Stable Diffusion Initialization Failed: {e}. Check CUDA, Model paths.")
            self.pipe = None

    def generate_image_stable_diffusion_local(self, prompt, negative_prompt=DEFAULT_NEGATIVE_PROMPT, width=DEFAULT_IMAGE_WIDTH, height=DEFAULT_IMAGE_HEIGHT, seed=None, cfg_scale=DEFAULT_CFG_SCALE):

        if self.pipe is None:
            print("Stable Diffusion is not initialized.")
            return None
        try:

            generator = torch.Generator(device=self.device) #Get seed here to generate images
            if seed is None: # If a seed is chosen
                seed = random.randint(0, 2147483647) # create a new seed

            generator = generator.manual_seed(seed) #Add seed
            with torch.autocast(device_type=self.device, dtype=torch.float16): #Use autocast for mixed precision

                image = self.pipe(prompt,
                                    negative_prompt=negative_prompt, # add negative
                                    width=width, #with
                                    height=height, #hieght
                                    guidance_scale=cfg_scale, #guidance
                                    generator=generator).images[0]  # Generates

            return image  # PIL Image
        except Exception as e:
            print(f"Stable Diffusion Error: {e}")
            return None