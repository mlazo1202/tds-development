import os
import sys
import threading
import cv2
from flask import Response
from qt_camera import VideoRecorder
from PyQt5.QtWidgets import QApplication
from flask import Flask, request
from werkzeug.utils import secure_filename
from process_video import process_video
from evaluate_model import evaluate_model

app = Flask(__name__)
qt = QApplication(sys.argv)
camera = VideoRecorder()


def generate_frames():
    while True:

        frame = camera.current_frame

        if frame is None:
            continue
        _, buffer = cv2.imencode(".jpg", frame)

        frame = buffer.tobytes()

        yield (
            b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' +
            frame +
            b'\r\n'
        )


@app.route("/video_feed")
def video_feed():
    return Response(generate_frames(), mimetype="multipart/x-mixed-replace; boundary=frame")


def flask_thread():
    app.run(host="127.0.0.1", port=5000, threaded=True)


if __name__ == "__main__":
    threading.Thread(target=flask_thread, daemon=True).start()
    sys.exit(qt.exec())