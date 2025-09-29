document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('caesar-input');
    const key = document.getElementById('caesar-key');
    const output = document.getElementById('caesar-output');
    const encryptBtn = document.getElementById('caesar-encrypt-btn');
    const decryptBtn = document.getElementById('caesar-decrypt-btn');

    function caesarProcess(text, shift, isEncrypt) {
        shift = isEncrypt ? shift : (26 - shift);
        return text.replace(/[a-zA-Z]/g, (char) => {
            const base = char.toLowerCase() === char ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
            return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
        });
    }

    encryptBtn.addEventListener('click', () => {
        const shift = parseInt(key.value, 10);
        output.textContent = caesarProcess(input.value, shift, true);
    });

    decryptBtn.addEventListener('click', () => {
        const shift = parseInt(key.value, 10);
        output.textContent = caesarProcess(input.value, shift, false);
    });
});