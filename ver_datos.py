import h5py
import os

path = 'data/keypoints/'
for file in os.listdir(path):
    if file.endswith('.h5'):
        # Abrimos el archivo para ver cuántas muestras tiene
        with h5py.File(os.path.join(path, file), 'r') as f:
            # Asumimos que los datos están en un dataset llamado 'data'
            data = f['data'] 
            print(f"Letra {file}: {len(data)} secuencias")