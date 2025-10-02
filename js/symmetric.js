document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("symmetric-input");
  const key = document.getElementById("symmetric-key");
  const output = document.getElementById("symmetric-output");
  const encryptBtn = document.getElementById("symmetric-encrypt-btn");
  const decryptBtn = document.getElementById("symmetric-decrypt-btn");

  // --- Stream Cipher (XOR sederhana) ---
  function xorStreamEncrypt(plaintext, key) {
    let ciphertext = "";
    for (let i = 0; i < plaintext.length; i++) {
      const pChar = plaintext.charCodeAt(i);
      const kChar = key.charCodeAt(i % key.length);
      const cChar = pChar ^ kChar; // XOR
      ciphertext += String.fromCharCode(cChar);
    }
    return btoa(ciphertext); // ubah ke Base64 biar aman ditampilkan
  }

  function xorStreamDecrypt(ciphertext, key) {
    const decoded = atob(ciphertext);
    let plaintext = "";
    for (let i = 0; i < decoded.length; i++) {
      const cChar = decoded.charCodeAt(i);
      const kChar = key.charCodeAt(i % key.length);
      const pChar = cChar ^ kChar;
      plaintext += String.fromCharCode(pChar);
    }
    return plaintext;
  }

  encryptBtn.addEventListener("click", () => {
    let text = input.value;
    let keyEnc = key.value;

    if (!key) {
      alert("Masukan kunci rahasia!");
      return;
    }

    const result = xorStreamEncrypt(text, keyEnc);
    output.textContent = result;
  });

  decryptBtn.addEventListener("click", () => {
    let text = input.value;
    let keyDec = key.value;

    if (!key) {
      alert("Masukan kunci rahasia");
      return;
    }

    const result = xorStreamDecrypt(text, keyDec);
    output.textContent = result;
  });
});
