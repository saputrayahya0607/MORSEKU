// ===================== DICTIONARY =====================
// Dictionary untuk konversi huruf ke Morse
const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
};

// Membalik dictionary, dari Morse ke huruf
const textCode = {};
for (let key in morseCode) {
    textCode[morseCode[key]] = key;
}

// ===================== KONVERSI TEKS KE MORSE =====================
function textToMorse() {
    const input = document.getElementById('textInput').value.toUpperCase(); // Ambil input teks
    let morse = '';

    for (let char of input) {
        if (morseCode[char]) morse += morseCode[char] + ' ';  // Jika huruf dikenali
        else if (char === ' ') morse += '/ ';                 // Jika spasi
    }

    const output = document.getElementById('morseOutput');
    output.value = morse.trim();

    // Animasi hasil output
    output.style.animation = 'none';
    setTimeout(() => output.style.animation = 'fadeIn 0.5s ease-in', 10);
}

// ===================== KONVERSI MORSE KE TEKS =====================
function morseToText() {
    const input = document.getElementById('morseInput').value;
    const morseArray = input.split(' '); // Pisah tiap kode
    let text = '';

    for (let morse of morseArray) {
        if (textCode[morse]) text += textCode[morse]; // Cari hurufnya
        else if (morse === '/') text += ' ';         // Spasi antar kata
    }

    const output = document.getElementById('textOutput');
    output.value = text;

    // Animasi hasil output
    output.style.animation = 'none';
    setTimeout(() => output.style.animation = 'fadeIn 0.5s ease-in', 10);
}

// ===================== TEKAN ENTER LANGSUNG KONVERSI =====================
document.getElementById('textInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        textToMorse();
    }
});
document.getElementById('morseInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        morseToText();
    }
});

// ===================== ANIMASI TEKAN TOMBOL =====================
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn, .result-btn');
    buttons.forEach(btn => {
        btn.addEventListener('touchstart', () => btn.style.transform = 'scale(0.98)');
        btn.addEventListener('touchend', () => btn.style.transform = 'scale(1)');
    });
});

// ===================== SUARA MORSE =====================
let audioContext;
function initAudioContext() {
    if (!audioContext)
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

// Fungsi membuat suara beep
function playBeep(frequency, duration) {
    initAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine'; // Bentuk gelombang

    // Atur volume dan durasi
    gainNode.gain.setValueAtTime(5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(2, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// Mainkan suara berdasarkan kode morse
function playMorseSound(morseCode) {
    let delay = 0;
    const dotDuration = 0.15; // Detik -> lebih pendek
    const dashDuration = 0.4; // Detik -> lebih panjang
    const gap = 0.3;          // Jeda antar simbol
    const space = 0.6;        // Jeda antar huruf/kata

    for (let char of morseCode) {
        if (char === '.') {
            setTimeout(() => playBeep(700, dotDuration), delay * 1000);
            delay += dotDuration + gap;
        } else if (char === '-') {
            setTimeout(() => playBeep(700, dashDuration), delay * 1000);
            delay += dashDuration + gap;
        } else if (char === ' ') {
            delay += space;
        } else if (char === '/') {
            delay += space * 2;
        }
    }
}


// Tombol play morse
function playMorse() {
    const morseOutput = document.getElementById('morseOutput').value;
    if (morseOutput) {
        playMorseSound(morseOutput);
        showNotification('Memainkan suara sandi morse...');
    }
}

// ===================== SUARA TEXT-TO-SPEECH =====================
function playText() {
    const textOutput = document.getElementById('textOutput').value;
    if (!textOutput) return;

    const audio = new Audio(`/speak?text=${encodeURIComponent(textOutput)}`);
    audio.play();

    showNotification('Memainkan suara teks ...');
}


// ===================== FITUR COPY =====================
function copyMorse() {
    const val = document.getElementById('morseOutput').value;
    if (val) navigator.clipboard.writeText(val).then(() => showNotification('Sandi morse berhasil disalin!'));
}

function copyText() {
    const val = document.getElementById('textOutput').value;
    if (val) navigator.clipboard.writeText(val).then(() => showNotification('Teks berhasil disalin!'));
}

// ===================== FITUR CLEAR =====================
function clearMorse() {
    document.getElementById('textInput').value = '';
    document.getElementById('morseOutput').value = '';
}

function clearText() {
    document.getElementById('morseInput').value = '';
    document.getElementById('textOutput').value = '';
}

// ===================== NOTIFIKASI =====================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(139, 69, 19, 0.95);
        color: #F4A460;
        padding: 12px 24px;
        border-radius: 25px;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        border: 2px solid #D2691E;
        font-weight: bold;
        animation: slideDown 0.3s ease-out;
    `;
    document.body.appendChild(notification);

    // Setelah 3 detik, hilangkan notifikasi
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// ===================== ANIMASI NOTIFIKASI =====================
const style = document.createElement('style');
style.textContent = `
@keyframes slideDown {
    from { opacity: 0; transform: translateX(-50%) translateY(-30px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
}
@keyframes slideUp {
    from { opacity: 1; transform: translateX(-50%) translateY(0); }
    to { opacity: 0; transform: translateX(-50%) translateY(-30px); }
}
`;
document.head.appendChild(style);
