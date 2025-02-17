# rpgpt/versions.py

import os
import torch
import subprocess
import sys
import flask
import PIL
import logging

logger = logging.getLogger(__name__)

def get_git_version():
    """
    Retrieves the git version. Returns "N/A" if an error occurs.
    """
    try:
        result = subprocess.run(['git', 'describe', '--tags', '--always'], capture_output=True, text=True, check=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        logger.warning(f"Error getting git version: {e}")
        return "N/A"
    except FileNotFoundError:
        logger.warning("Git executable not found.")
        return "N/A"
    except Exception as e:
        logger.exception("Error while getting git version")
        return "N/A"

def get_os_name():
    """
    Retrieves the operating system name.
    """
    return os.name

def get_torch_version():
    """
    Retrieves the PyTorch version. Returns "N/A" if not available.
    """
    try:
        return torch.__version__
    except Exception as e:
        logger.warning(f"Error getting torch version: {e}")
        return "N/A"

def get_torch_cuda_available():
    """
    Checks if CUDA is available for PyTorch. Returns "N/A" if not available.
    """
    try:
        return torch.cuda.is_available()
    except Exception as e:
        logger.warning(f"Error checking CUDA availability: {e}")
        return "N/A"

def get_torch_cuda_device_count():
    """
    Gets the number of CUDA devices. Returns "N/A" if not available.
    """
    try:
        return torch.cuda.device_count()
    except Exception as e:
        logger.warning(f"Error getting CUDA device count: {e}")
        return "N/A"

def get_nodejs_version():
    """
    Retrieves the Node.js version. Returns "N/A" if Node.js is not installed or an error occurs.
    """
    try:
        result = subprocess.run(['node', '--version'], capture_output=True, text=True, check=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        logger.warning(f"Error getting Node.js version: {e}")
        return "N/A"
    except FileNotFoundError:
        logger.warning("Node.js executable not found.")
        return "N/A"
    except Exception as e:
        logger.exception("Error while getting Node.js version")
        return "N/A"

def get_python_version():
    """
    Retrieves the Python version.
    """
    return sys.version

def get_flask_version():
    """
    Retrieves the Flask version.
    """
    return flask.__version__

def get_pil_version():
    """
    Retrieves the PIL version. Returns "N/A" if PIL is not installed or an error occurs.
    """
    try:
        return PIL.__version__
    except Exception as e:
        logger.warning(f"Error getting PIL version: {e}")
        return "N/A"

def get_rpgpt_version():
    """
    Retrieves the rpgpt version from the .version file. Returns "N/A" if the file is not found or an error occurs.
    """
    try:
        with open('.version', 'r') as version_file:
            return version_file.read().strip()
    except FileNotFoundError:
        logger.warning("'.version' file not found.")
        return "N/A"
    except Exception as e:
        logger.exception("Error while getting rpgpt version")
        return "N/A"