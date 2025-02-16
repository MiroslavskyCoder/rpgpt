# rpgpt/image_effects.py
import PyOpenColorIO as ocio
import numpy as np
from PIL import Image, ImageEnhance, ImageOps
import colorsys

#Place the code into the image_effects.py for easy reference.
def apply_lgg(image, lift, gamma, gain):
    """Applies Lift, Gamma, Gain color correction using OCIO."""
    try:
        cfg = ocio.Config.CreateFromFile("data/OCIO/color.ocio") #Config file
        cdl_transform = ocio.CDLTransform()
        cdl_transform.setSlope(gain)
        cdl_transform.setOffset(lift)
        cdl_transform.setPower(gamma)

        processor = cfg.getProcessor(cdl_transform)

        np_img = np.array(image).astype(np.float32) / 255.0 #Normalize to 0-1
        np_img = processor.apply(np_img)
        np_img = np.clip(np_img * 255, 0, 255).astype(np.uint8) #Convert back

        return Image.fromarray(np_img) #return Image.

    except Exception as e:
        print(f"Error applying LGG: {e}")
        return image

def apply_white_balance(image, temperature, tint):
    """Applies a white balance adjustment."""
    r, g, b = image.split()
    r = r.point(lambda i: i * (1.0 + temperature/100.0))
    b = b.point(lambda i: i * (1.0 - temperature/100.0))
    g = g.point(lambda i: i * (1.0 + tint/100.0))

    image = Image.merge(image.mode, (r, g, b))
    return image

def adjust_exposure_contrast(image, exposure, contrast):
    enhancer = ImageEnhance.Brightness(image)
    image = enhancer.enhance(exposure)

    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(contrast)
    return image

def adjust_hue_saturation(image, hue, saturation):
    enhancer = ImageEnhance.Color(image)
    image = enhancer.enhance(saturation)
    enhancer = ImageEnhance.Brightness(image)
    image = enhancer.enhance(hue)
    return image

def adjust_keyer_hue_saturation(image, hue_center, hue_range, saturation_adjust):
    """Adjusts the saturation of a specific hue range."""
    image = image.convert("RGBA")
    pixels = image.load()
    for i in range(image.size[0]):
        for j in range(image.size[1]):
            r, g, b, a = pixels[i, j]
            h, s, v = colorsys.rgb_to_hsv(r / 255.0, g / 255.0, b / 255.0)
            hue_diff = abs(h - hue_center)
            if hue_diff > 0.5:
                hue_diff = 1.0 - hue_diff

            if hue_diff <= hue_range:
                s = max(0.0, min(1.0, s * saturation_adjust))
                r, g, b = colorsys.hsv_to_rgb(h, s, v)
                pixels[i, j] = (int(r * 255), int(g * 255), int(b * 255), a)

    return image

def apply_tone_curve(image, curve):
    """Applies a tone curve to the image."""
    if len(curve) != 256:
        raise ValueError("Tone curve must have 256 values")
    if image.mode != "L":
        image = image.convert("L")
    return image.point(curve)

def apply_lut(image, lut_path):
    """Applies a LUT to the image."""
    try:
        lut = Image.open(lut_path)
        if lut.mode != "RGB":
            lut = lut.convert("RGB")

        if image.mode != "RGB":
            image = image.convert("RGB")

        image = image.point(lut.getdata())
        return image
    except Exception as e:
        print(f"Error applying LUT: {e}")
        return image