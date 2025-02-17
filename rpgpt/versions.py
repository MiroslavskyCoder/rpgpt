import os
import torch
import subprocess
import sys
import flask

def get_git_version():
    result = subprocess.run(['git', 'describe', '--tags', '--always'], stdout=subprocess.PIPE)
    return result.stdout.decode('utf-8').strip()

def get_os_name():
    return os.name

def get_torch_version():
    return torch.__version__

def get_torch_cuda_available():
    return torch.cuda.is_available()

def get_torch_cuda_device_count():
    return torch.cuda.device_count()

def get_nodejs_version():
    result = subprocess.run(['node', '--version'], stdout=subprocess.PIPE)
    return result.stdout.decode('utf-8').strip()

def get_python_version():
    return sys.version

def get_flask_version(): 
    return flask.__version__

def get_pil_version(): 
    import PIL
    return PIL.__version__

def get_rpgpt_version(): 
    with open('.version', 'r') as version_file:
        return version_file.read().strip()

