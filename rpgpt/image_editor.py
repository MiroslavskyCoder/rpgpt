# rpgpt/image_editor.py
from PIL import Image
from . import image_effects # Local import
import numpy as np
import PyOpenColorIO as ocio # OCIO is a must.

def apply_effect(image, effect_name, effect_params=None):
    """
    Applies a specified effect to the given image.
    """
    try:

        if effect_name == "lgg":
            lift = effect_params.get("lift", (0.0, 0.0, 0.0)) #Get parameters
            gamma = effect_params.get("gamma", (1.0, 1.0, 1.0))
            gain = effect_params.get("gain", (1.0, 1.0, 1.0))
            return image_effects.apply_lgg(image, lift, gamma, gain)

        elif effect_name == "white_balance":
            temperature = effect_params.get("temperature", 0.0) #get temperature
            tint = effect_params.get("tint", 0.0)
            return image_effects.apply_white_balance(image, temperature, tint)

        elif effect_name == "exposure":
            exposure = effect_params.get("exposure", 1.0) #Default
            contrast = effect_params.get("contrast", 1.0) #Default
            return image_effects.adjust_exposure_contrast(image, exposure, contrast)

        elif effect_name == "hue_saturation": #get hue and saturation
            hue = effect_params.get("hue", 0.0)
            saturation = effect_params.get("saturation", 1.0)
            return image_effects.adjust_hue_saturation(image, hue, saturation) #adjust hue, and the saturation
        elif effect_name == "keyer_hue_saturation":
            hue_center = effect_params.get("hue_center", 0.0) #get the hue, and saturation and then load it as a param
            hue_range = effect_params.get("hue_range", 0.1) #get the saturation
            saturation_adjust = effect_params.get("saturation_adjust", 1.0)
            return image_effects.adjust_keyer_hue_saturation(image, hue_center, hue_range, saturation_adjust)

        elif effect_name == "tone_curve": #get the tone from here
            curve = effect_params.get("curve", [i for i in range(256)])
            return image_effects.apply_tone_curve(image, curve)

        elif effect_name == "apply_lut":
            lut_path = effect_params.get("lut_path")
            return image_effects.apply_lut(image, lut_path)

        else:
            print(f"Unknown effect: {effect_name}")
            return image #Return defaut image on fail.

    except Exception as e:
        print(f"Error applying effect {effect_name}: {e}")
        return image #And also return the default image, again.