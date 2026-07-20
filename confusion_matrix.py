import numpy as np
import os
import matplotlib.pyplot as plt
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay

# Importamos desde tus archivos
from helpers import get_word_ids, get_sequences_and_labels
from constants import *

def generate_confusion_matrix():
    # 1. Usamos la ruta correcta al archivo JSON, no a la carpeta
    print(f"Cargando etiquetas desde: {WORDS_JSON_PATH}")
    word_ids = get_word_ids(WORDS_JSON_PATH) 
    
    # 2. Cargar datos
    print("Cargando secuencias y etiquetas...")
    sequences, labels = get_sequences_and_labels(word_ids)
    
    # 3. Normalizar datos a 15 frames (MODEL_FRAMES está en constants.py)
    sequences = pad_sequences(sequences, maxlen=int(MODEL_FRAMES), padding='pre', truncating='post', dtype='float32')
    
    # 4. Cargar tu único modelo
    print(f"Cargando modelo desde: {MODEL_PATH}")
    model = load_model(MODEL_PATH)
    
    # 5. Obtener predicciones
    print("Generando predicciones...")
    predictions = model.predict(sequences)
    predicted_labels = np.argmax(predictions, axis=1)
    
    # 6. Generar y mostrar matriz
    print("Calculando matriz de confusión...")
    conf_matrix = confusion_matrix(labels, predicted_labels)
    
    plt.figure(figsize=(10, 8))
    disp = ConfusionMatrixDisplay(confusion_matrix=conf_matrix, display_labels=word_ids)
    disp.plot(cmap=plt.cm.Blues, xticks_rotation='vertical')
    plt.title('Matriz de Confusión - LSP')
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    generate_confusion_matrix()