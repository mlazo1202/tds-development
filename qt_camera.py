import sys
import cv2
import numpy as np
import pyttsx3
import threading
from flask import Flask
from flask import Response
from PyQt5.QtWidgets import QApplication, QMainWindow
from PyQt5.QtGui import QImage, QPixmap
from PyQt5.QtCore import QTimer, Qt
from PyQt5.uic import loadUi
from keras.models import load_model
from mediapipe.python.solutions.holistic import Holistic
from helpers import mediapipe_detection, draw_keypoints, extract_keypoints, get_word_ids
from constants import *

class Speaker(threading.Thread):
    def __init__(self, text):
        super().__init__()
        self.text = text
    def run(self):
        engine = pyttsx3.init()
        engine.say(self.text)
        engine.runAndWait()

class VideoRecorder(QMainWindow):
    def __init__(self):
        super().__init__()
        loadUi('mainwindow.ui', self)
        self.current_frame = None
        
        self.word_ids = get_word_ids(WORDS_JSON_PATH)
        self.model = load_model(MODEL_PATH)
        self.holistic_model = Holistic()
        
        self.capture = cv2.VideoCapture(0)
        self.kp_seq = []
        self.ultima_letra = "" 
        
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.update_frame)
        self.timer.start(30)
    
    def update_frame(self):
        ret, frame = self.capture.read()
        if not ret: return
        
        results = mediapipe_detection(frame, self.holistic_model)
        self.kp_seq.append(extract_keypoints(results))
        if len(self.kp_seq) > 15:
            self.kp_seq.pop(0) 
            
        if len(self.kp_seq) == 15:
            res = self.model.predict(np.expand_dims(self.kp_seq, axis=0), verbose=0)[0]
            
            # Umbral de confianza ajustado a 0.7
            if np.max(res) > 0.4:
                letra = self.word_ids[np.argmax(res)]
                cv2.putText(frame, f"Letra: {letra}", (50, 50), 
                            cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 255, 0), 3)
                
                # Lógica para hablar solo cuando cambia la letra
                if letra != self.ultima_letra:
                    speaker = Speaker(letra)
                    speaker.start()
                    self.ultima_letra = letra
        
        draw_keypoints(frame, results)
        self.current_frame = frame.copy()
        
        rgb_image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        h, w, ch = rgb_image.shape
        bytes_per_line = ch * w
        qImg = QImage(rgb_image.data, w, h, bytes_per_line, QImage.Format_RGB888)
        self.lbl_video.setPixmap(QPixmap.fromImage(qImg.scaled(self.lbl_video.size(), Qt.KeepAspectRatio)))


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = VideoRecorder()
    window.show()
    sys.exit(app.exec_())