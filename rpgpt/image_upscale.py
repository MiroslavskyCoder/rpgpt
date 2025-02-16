# rpgpt/upscale_ai.py
from PIL import Image
#Option 1 - using Real-ESRGAN
#from real_esrgan import RealESRGAN #To use Real ESRGAN
#Option 2 - using ESPCN
#import cv2 #To use OpenCV
#import numpy as np
class UpscaleAI:

    def upscale_image(self, image, scale): #Upscale Image
        """Upscales an image using a pre-trained model."""
        return image # if none are selected do this.
        #Option 1 - using Real-ESRGAN
        #return self.upscale_real_esrgan(image,scale) #return real esrgan

        #Option 2 - using ESPCN
        #return self.upscale_espcn(image,scale) #return espcn
    def upscale_real_esrgan(self,image, scale):
        """Upscales an image using Real-ESRGAN."""
        return image # not implemented
    def upscale_espcn(self,image, scale):
        """Upscales an image using ESPCN."""
        return image # not implemented