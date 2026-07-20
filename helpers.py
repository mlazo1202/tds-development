import json
import os
import cv2
import numpy as np
import pandas as pd
from mediapipe.python.solutions.holistic import HAND_CONNECTIONS
from mediapipe.python.solutions.drawing_utils import draw_landmarks, DrawingSpec
import constants 

# --- FUNCIONES GENERALES ---
def create_folder(path):
    if not os.path.exists(path):
        os.makedirs(path)

def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False
    results = model.process(image)
    return results

def get_word_ids(path):
    with open(path, 'r') as json_file:
        data = json.load(json_file)
        return data.get('word_ids')

# --- FUNCIONES DE KEYPOINTS ---
def extract_keypoints(results):
    lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21*3)
    rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21*3)
    return np.concatenate([lh, rh])

def get_keypoints(model, sample_path, image_list=None):
    kp_seq = []
    
    # Si no pasamos una lista específica, usamos os.listdir como antes
    if image_list is None:
        file_list = sorted([f for f in os.listdir(sample_path) if f.lower().endswith(('.jpg', '.png', '.jpeg'))])
    else:
        file_list = image_list
        
    for img_name in file_list:
        img_path = os.path.join(sample_path, img_name)
        frame = cv2.imread(img_path)
        if frame is not None:
            results = mediapipe_detection(frame, model)
            kp_frame = extract_keypoints(results)
            kp_seq.append(kp_frame)
    return np.array(kp_seq)

# --- FUNCIONES DE DIBUJO ---
def draw_keypoints(image, results):
    draw_landmarks(image, results.left_hand_landmarks, HAND_CONNECTIONS,
                DrawingSpec(color=(121, 22, 76), thickness=2, circle_radius=4),
                DrawingSpec(color=(121, 44, 250), thickness=2, circle_radius=2))
    draw_landmarks(image, results.right_hand_landmarks, HAND_CONNECTIONS,
                DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=4),
                DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2))

# --- FUNCIONES DE ENTRENAMIENTO ---
def get_sequences_and_labels(words_id):
    sequences, labels = [], []
    for word_index, word_id in enumerate(words_id):
        hdf_path = os.path.join(constants.KEYPOINTS_PATH, f"{word_id}.h5")
        if not os.path.exists(hdf_path): continue
        data = pd.read_hdf(hdf_path, key='data')
        for _, df_sample in data.groupby('sample'):
            seq_keypoints = [fila['keypoints'] for _, fila in df_sample.iterrows()]
            sequences.append(seq_keypoints)
            labels.append(word_index)
    return sequences, labels

def insert_keypoints_sequence(df, n_sample, kp_seq):
    for frame_idx, keypoints in enumerate(kp_seq):
        data_row = pd.DataFrame({
            'sample': [n_sample],
            'frame': [frame_idx],
            'keypoints': [keypoints]
        })
        df = pd.concat([df, data_row], ignore_index=True)
    return df