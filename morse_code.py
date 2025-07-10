# Dictionary morse ke teks
morse_to_text = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
    '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
    '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
    '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
    '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
    '--..': 'Z', '-----': '0', '.----': '1', '..---': '2',
    '...--': '3', '....-': '4', '.....': '5', '-....': '6',
    '--...': '7', '---..': '8', '----.': '9', '--..--': ',',    # koma
    '.-.-.-': '.', '..--..': '?', '.----.': "'", '-.-.--': '!', # tanda baca
    '-..-.': '/', '-.--.': '(', '-.--.-': ')', '.-...': '&',
    '---...': ':', '-.-.-.': ';', '-...-': '=', '.-.-.': '+',
    '-....-': '-', '..--.-': '_', '.-..-.': '"', '...-..-': '$',
    '.--.-.': '@', '...---...': 'SOS'                          # sinyal darurat
}

# Membalik dictionary jadi text ke morse
text_to_morse = {v: k for k, v in morse_to_text.items()}

# ==============================================
# Fungsi: Morse ke Teks
# ==============================================
def morse_to_text_convert(morse_code):
    """Konversi kode morse ke teks"""
    try:
        # Pisahkan kata berdasarkan 3 spasi
        words = morse_code.strip().split('   ')
        result = []

        for word in words:
            # Pisahkan huruf berdasarkan 1 spasi
            letters = word.split(' ')
            translated_word = ''

            for letter in letters:
                # Cari hurufnya di dictionary
                if letter in morse_to_text:
                    translated_word += morse_to_text[letter]
                # Jika tidak ditemukan, beri tanda '?'
                elif letter.strip():
                    translated_word += '?'

            result.append(translated_word)

        # Gabungkan hasil kata
        return ' '.join(result)

    except Exception as e:
        # Tangani error kalau ada
        return f"Error in translation: {str(e)}"

# ==============================================
# Fungsi: Teks ke Morse
# ==============================================
def text_to_morse_convert(text):
    """Konversi teks ke kode morse"""
    try:
        result = []

        # Loop semua huruf teks
        for char in text.upper():
            if char == ' ':
                result.append('   ')  # Spasi antar kata → 3 spasi
            elif char in text_to_morse:
                result.append(text_to_morse[char])  # Cari di dictionary
            else:
                result.append('?')  # Jika karakter tidak dikenali

        # Gabungkan hasil huruf
        return ' '.join(result)

    except Exception as e:
        # Tangani error kalau ada
        return f"Error in translation: {str(e)}"
