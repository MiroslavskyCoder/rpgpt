from flask import request, jsonify 
from app import api_bp
import torch

@api_bp.route('/torch/sum', methods=['POST'])
def torch_sum():
    tensor = request.get_json()['tensor']
    tensor = torch.tensor(tensor)
    sum_tensor = torch.sum(tensor)
    return jsonify({'sum': sum_tensor.item()})

@api_bp.route('/torch/mean', methods=['POST'])
def torch_mean():
    tensor = request.get_json()['tensor']
    tensor = torch.tensor(tensor)
    mean_tensor = torch.mean(tensor)
    return jsonify({'mean': mean_tensor.item()})

@api_bp.route('/torch/max', methods=['POST'])
def torch_max():
    tensor = request.get_json()['tensor']
    tensor = torch.tensor(tensor)
    max_tensor = torch.max(tensor)
    return jsonify({'max': max_tensor.item()})

@api_bp.route('/torch/reshape', methods=['POST'])
def torch_reshape():
    tensor = request.get_json()['tensor']
    shape = request.get_json()['shape']
    tensor = torch.tensor(tensor)
    reshaped_tensor = tensor.view(*shape)
    return jsonify({'tensor': reshaped_tensor.tolist()})

@api_bp.route('/torch/transpose', methods=['POST'])
def torch_transpose():
    tensor = request.get_json()['tensor']
    tensor = torch.tensor(tensor)
    transposed_tensor = tensor.t()
    return jsonify({'tensor': transposed_tensor.tolist()})

@api_bp.route('/torch/multiply', methods=['POST'])
def torch_multiply():
    tensor = request.get_json()['tensor']
    scalar = request.get_json()['scalar']
    tensor = torch.tensor(tensor)
    multiplied_tensor = tensor * scalar
    return jsonify({'tensor': multiplied_tensor.tolist()})

