function speakText(text) {
    if (!text) return;
    let type = /^[.\-\/\s]+$/.test(text.trim()) ? 'morse' : 'text';
    let utteranceText = text;

    if (type === 'morse') {
        utteranceText = text.replace(/\./g, 'titik').replace(/-/g, 'strip').replace(/\//g, ' spasi ').replace(/\s+/g, ' ');
    }

    const msg = new SpeechSynthesisUtterance(utteranceText);
    msg.lang = "id-ID";
    window.speechSynthesis.speak(msg);
}

function copyText() {
    const text = document.getElementById('output').innerText;
    navigator.clipboard.writeText(text)
        .then(() => alert("Hasil disalin ke clipboard!"))
        .catch(() => alert("Gagal menyalin teks"));
}
