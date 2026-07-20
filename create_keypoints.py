import os
import pandas as pd
from mediapipe.python.solutions.holistic import Holistic
# Asegúrate de que esta línea contenga get_word_ids al final
from helpers import get_keypoints, insert_keypoints_sequence, create_folder, get_word_ids
from constants import *

def create_keypoints(word_id, words_path, hdf_path):
    data = pd.DataFrame([])
    frames_path = os.path.join(words_path, word_id)
    
    # Obtenemos la lista ordenada de las 538 imágenes
    images = sorted([f for f in os.listdir(frames_path) if f.lower().endswith(('.jpg', '.png'))])
    
    with Holistic() as holistic:
        print(f'Procesando fragmentos para "{word_id}"...')
        
        # 1. Extraemos los keypoints de todas las 538 imágenes primero
        all_keypoints = get_keypoints(holistic, frames_path, images)
        
        # 2. Fragmentamos usando ventana deslizante
        # MODEL_FRAMES es 15. Usaremos un salto (stride) de 5 para tener más datos
        n_sample = 1
        window_size = MODEL_FRAMES 
        stride = 5 
        
        for i in range(0, len(all_keypoints) - window_size, stride):
            chunk = all_keypoints[i : i + window_size]
            data = insert_keypoints_sequence(data, n_sample, chunk)
            n_sample += 1
            
    data.to_hdf(hdf_path, key="data", mode="w")
    print(f"Keypoints creados: {n_sample - 1} muestras fragmentadas para {word_id}.")

if __name__ == "__main__":
    create_folder(KEYPOINTS_PATH)
    word_ids = get_word_ids(WORDS_JSON_PATH) 
    
    for word_id in word_ids:
        hdf_path = os.path.join(KEYPOINTS_PATH, f"{word_id}.h5")
        if os.path.exists(os.path.join(FRAME_ACTIONS_PATH, word_id)):
            create_keypoints(word_id, FRAME_ACTIONS_PATH, hdf_path)