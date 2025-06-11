from flask import Flask, render_template, request, session
from datetime import timedelta
from morse_code import text_to_morse, morse_to_text

app = Flask(__name__)
app.secret_key = 'rahasia'
app.permanent_session_lifetime = timedelta(days=1)

@app.route('/', methods=['GET', 'POST'])
def index():
    result = ''
    if 'history' not in session:
        session['history'] = []

    if request.method == 'POST':
        mode = request.form['mode']
        user_input = request.form['input'].strip()
        if mode == 'to_morse':
            result = text_to_morse(user_input)
        else:
            result = morse_to_text(user_input)

        session['history'].append({'input': user_input, 'output': result})
        session.modified = True

    return render_template('index.html', result=result, history=session.get('history'))

@app.route('/clear_history', methods=['POST'])
def clear_history():
    session.pop('history', None)
    return ('', 204)

if __name__ == '__main__':
    app.run(debug=True)
