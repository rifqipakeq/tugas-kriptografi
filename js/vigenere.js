document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('vigenere-input');
    const key = document.getElementById('vigenere-key');
    const output = document.getElementById('vigenere-output');
    const encryptBtn = document.getElementById('vigenere-encrypt-btn');
    const decryptBtn = document.getElementById('vigenere-decrypt-btn');

    function vigenereProcess(text, key, isEncrypt) {
        if (!key) return "Error: Kunci tidak boleh kosong.";
        key = key.toUpperCase().replace(/[^A-Z]/g, '');
        if (key.length === 0) return "Error: Kunci tidak valid (hanya berisi non-alfabet).";
        
        let keyIndex = 0;
        return text.replace(/[a-zA-Z]/g, (char) => {
            const base = char.toLowerCase() === char ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
            const shift = key.charCodeAt(keyIndex % key.length) - 'A'.charCodeAt(0);
            const finalShift = isEncrypt ? shift : (26 - shift);
            keyIndex++;
            return String.fromCharCode(((char.charCodeAt(0) - base + finalShift) % 26) + base);
        });
    }

    encryptBtn.addEventListener('click', () => {
        output.textContent = vigenereProcess(input.value, key.value, true);
    });

    decryptBtn.addEventListener('click', () => {
        output.textContent = vigenereProcess(input.value, key.value, false);
    });
});