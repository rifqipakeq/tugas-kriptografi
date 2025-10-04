document.addEventListener("DOMContentLoaded", () => {
  // Ambil semua elemen yang dibutuhkan
  const input = document.getElementById("super-input");
  const output = document.getElementById("super-output");
  const encryptBtn = document.getElementById("super-encrypt-btn");
  const decryptBtn = document.getElementById("super-decrypt-btn");
  const generateRsaBtn = document.getElementById("super-generate-rsa-btn");

  // Kunci-kunci
  const caesarKeyInput = document.getElementById("super-caesar-key");
  const vigenereKeyInput = document.getElementById("super-vigenere-key");
  const symmetricKeyInput = document.getElementById("super-aes-key");
  const rsaPublicKeyInput = document.getElementById("super-rsa-public");
  const rsaPrivateKeyInput = document.getElementById("super-rsa-private");

  // Membuat Pasangan Kunci RSA Baru
  generateRsaBtn.addEventListener("click", () => {
    output.textContent = "Membuat pasangan kunci RSA...";
    
    // Inisialisasi JSEncrypt dengan ukuran kunci 2048 bit
    const crypt = new JSEncrypt({ default_key_size: 2048 });

    // Mendapatkan kunci publik dan privat dalam format PEM
    const publicKey = crypt.getPublicKey();
    const privateKey = crypt.getPrivateKey();

    // Menampilkan kunci pada textarea
    rsaPublicKeyInput.value = publicKey;
    rsaPrivateKeyInput.value = privateKey;
    
    output.textContent = "✅ Pasangan kunci RSA berhasil dibuat! Kunci Public dan Private telah diisi otomatis.";
  });

  // 1. FUNGSI CAESAR CIPHER
  function caesarEncrypt(text, shift) {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const base = char.toLowerCase() === char ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
      return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
    });
  }

  function caesarDecrypt(text, shift) {
    return caesarEncrypt(text, 26 - shift);
  }

  // 2. FUNGSI VIGENÈRE CIPHER
  function vigenereEncrypt(text, key) {
    if (!key) return text;
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    if (key.length === 0) return text;
    
    let keyIndex = 0;
    return text.replace(/[a-zA-Z]/g, (char) => {
      const base = char.toLowerCase() === char ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
      const shift = key.charCodeAt(keyIndex % key.length) - 'A'.charCodeAt(0);
      keyIndex++;
      return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
    });
  }

  function vigenereDecrypt(text, key) {
    if (!key) return text;
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    if (key.length === 0) return text;
    
    let keyIndex = 0;
    return text.replace(/[a-zA-Z]/g, (char) => {
      const base = char.toLowerCase() === char ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
      const shift = key.charCodeAt(keyIndex % key.length) - 'A'.charCodeAt(0);
      keyIndex++;
      return String.fromCharCode(((char.charCodeAt(0) - base + (26 - shift)) % 26) + base);
    });
  }

  // 3. FUNGSI SYMMETRIC (XOR STREAM CIPHER)
  function symmetricEncrypt(plaintext, key) {
    let ciphertext = "";
    for (let i = 0; i < plaintext.length; i++) {
      const pChar = plaintext.charCodeAt(i);
      const kChar = key.charCodeAt(i % key.length);
      const cChar = pChar ^ kChar;
      ciphertext += String.fromCharCode(cChar);
    }
    return btoa(ciphertext); // Convert to Base64
  }

  function symmetricDecrypt(ciphertext, key) {
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

  // 4. FUNGSI ASYMMETRIC (RSA)
  function rsaEncrypt(text, publicKey) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(text);
  }

  function rsaDecrypt(text, privateKey) {
    const decrypt = new JSEncrypt();
    decrypt.setPrivateKey(privateKey);
    return decrypt.decrypt(text);
  }

  // SUPER ENKRIPSI
  // Urutan: Caesar → Vigenère → Symmetric → RSA
  encryptBtn.addEventListener("click", () => {
    const plaintext = input.value;
    
    // Validasi input
    if (!plaintext) {
      alert("Masukkan teks yang akan dienkripsi!");
      return;
    }

    // Ambil semua kunci
    const caesarKey = parseInt(caesarKeyInput.value, 10);
    const vigenereKey = vigenereKeyInput.value;
    const symmetricKey = symmetricKeyInput.value;
    const rsaPublicKey = rsaPublicKeyInput.value;

    // Validasi kunci
    if (isNaN(caesarKey)) {
      alert("Masukkan kunci Caesar (angka)!");
      return;
    }
    if (!vigenereKey) {
      alert("Masukkan kunci Vigenère!");
      return;
    }
    if (!symmetricKey) {
      alert("Masukkan kunci Symmetric!");
      return;
    }
    if (!rsaPublicKey) {
      alert("Masukkan kunci Public RSA! Klik tombol '🔑 Generate Pasangan Kunci RSA Baru' untuk membuat kunci yang valid.");
      return;
    }

    try {
      // Tahap 1: Caesar Cipher
      let result = caesarEncrypt(plaintext, caesarKey);
      console.log("Setelah Caesar:", result);

      // Tahap 2: Vigenère Cipher
      result = vigenereEncrypt(result, vigenereKey);
      console.log("Setelah Vigenère:", result);

      // Tahap 3: Symmetric (XOR)
      result = symmetricEncrypt(result, symmetricKey);
      console.log("Setelah Symmetric:", result);

      // Tahap 4: Asymmetric (RSA)
      result = rsaEncrypt(result, rsaPublicKey);
      console.log("Setelah RSA:", result);

      if (result) {
        output.textContent = result;
      } else {
        output.textContent = "❌ Enkripsi gagal pada tahap RSA.\n\nKemungkinan penyebab:\n1. Kunci RSA tidak valid (gunakan tombol '🔑 Generate Pasangan Kunci RSA Baru')\n2. Teks terlalu panjang untuk enkripsi RSA (maksimal ~214 karakter untuk kunci 2048-bit)\n\n💡 Tip: RSA hanya untuk enkripsi data kecil. Untuk teks panjang, sistem ini menggunakan kombinasi dengan enkripsi lainnya.";
      }
    } catch (error) {
      output.textContent = "Terjadi kesalahan saat enkripsi: " + error.message;
      console.error(error);
    }
  });

  // SUPER DEKRIPSI
  // Urutan: RSA → Symmetric → Vigenère → Caesar
  decryptBtn.addEventListener("click", () => {
    const ciphertext = input.value;
    
    // Validasi input
    if (!ciphertext) {
      alert("Masukkan teks yang akan didekripsi!");
      return;
    }

    // Ambil semua kunci
    const caesarKey = parseInt(caesarKeyInput.value, 10);
    const vigenereKey = vigenereKeyInput.value;
    const symmetricKey = symmetricKeyInput.value;
    const rsaPrivateKey = rsaPrivateKeyInput.value;

    // Validasi kunci
    if (isNaN(caesarKey)) {
      alert("Masukkan kunci Caesar (angka)!");
      return;
    }
    if (!vigenereKey) {
      alert("Masukkan kunci Vigenère!");
      return;
    }
    if (!symmetricKey) {
      alert("Masukkan kunci Symmetric!");
      return;
    }
    if (!rsaPrivateKey) {
      alert("Masukkan kunci Private RSA!");
      return;
    }

    try {
      // Tahap 1: RSA (kebalikan pertama)
      let result = rsaDecrypt(ciphertext, rsaPrivateKey);
      console.log("Setelah RSA Decrypt:", result);

      if (!result) {
        output.textContent = "Dekripsi gagal pada tahap RSA. Pastikan ciphertext dan kunci Private RSA benar.";
        return;
      }

      // Tahap 2: Symmetric (XOR)
      result = symmetricDecrypt(result, symmetricKey);
      console.log("Setelah Symmetric Decrypt:", result);

      // Tahap 3: Vigenère Cipher
      result = vigenereDecrypt(result, vigenereKey);
      console.log("Setelah Vigenère Decrypt:", result);

      // Tahap 4: Caesar Cipher
      result = caesarDecrypt(result, caesarKey);
      console.log("Setelah Caesar Decrypt:", result);

      output.textContent = result;
    } catch (error) {
      output.textContent = "Terjadi kesalahan saat dekripsi: " + error.message;
      console.error(error);
    }
  });
});
