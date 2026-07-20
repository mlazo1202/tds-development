import numpy as np
from model import get_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.callbacks import EarlyStopping
from sklearn.model_selection import train_test_split
from keras.utils import to_categorical
from tensorflow.keras.optimizers import Adam
from helpers import get_word_ids, get_sequences_and_labels
from constants import *

def training_model(model_path, epochs=500):
    # 1. Carga de etiquetas
    word_ids = get_word_ids(WORDS_JSON_PATH)
    
    # 2. Carga de secuencias y etiquetas
    sequences, labels = get_sequences_and_labels(word_ids)
    
    # 3. Padding para asegurar que todas las secuencias tengan MODEL_FRAMES
    sequences = pad_sequences(sequences, maxlen=int(MODEL_FRAMES), padding='pre', truncating='post', dtype='float16')
    
    X = np.array(sequences)
    y = to_categorical(labels).astype(int) 
    
    # 4. Configuración de EarlyStopping (monitoreamos val_loss para evitar overfitting)
    # Patience aumentada a 20 para dar más tiempo al modelo de aprender
    early_stopping = EarlyStopping(monitor='val_loss', patience=20, restore_best_weights=True)
    
    # 5. Split de datos: 10% para validación es mejor para datasets de 26 clases
    X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.1, random_state=42)
    
    # 6. Definición del modelo
    model = get_model(int(MODEL_FRAMES), len(word_ids))
    
    # Configuración de optimizador con tasa de aprendizaje lenta para mayor precisión
    optimizer = Adam(learning_rate=0.0001)
    model.compile(optimizer=optimizer, loss='categorical_crossentropy', metrics=['accuracy'])
    
    # 7. Entrenamiento
    # Aumentamos batch_size a 32 para mejorar estabilidad
    model.fit(X_train, y_train, 
              validation_data=(X_val, y_val), 
              epochs=epochs, 
              batch_size=32, 
              callbacks=[early_stopping])
    
    model.summary()
    model.save(model_path)
    print(f"Modelo guardado exitosamente en: {model_path}")

if __name__ == "__main__":
    training_model(MODEL_PATH)

