from flask import Flask, render_template, request, send_file
from gtts import gTTS
import io

app = Flask(__name__)

# Halaman utama
@app.route('/')
def index():
    return render_template('index.html')

# Halaman referensi
@app.route('/referensi')
def referensi():
    return render_template('referensi.html')

# Halaman credit
@app.route('/credits')
def credits():
    return render_template('credits.html')

# Route TTS pakai gTTS
@app.route('/speak')
def speak():
    text = request.args.get('text', '')
    if not text:
        return 'No text provided', 400

    tts = gTTS(text, lang='id')
    mp3_fp = io.BytesIO()
    tts.write_to_fp(mp3_fp)
    mp3_fp.seek(0)

    return send_file(mp3_fp, mimetype='audio/mpeg')

if __name__ == '__main__':
    app.run(debug=True)
