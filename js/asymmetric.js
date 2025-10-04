document.addEventListener("DOMContentLoaded", () => {
  // 1. Mengambil semua elemen HTML yang dibutuhkan
  const generateBtn = document.getElementById("rsa-generate-btn");
  const encryptBtn = document.getElementById("rsa-encrypt-btn");
  const decryptBtn = document.getElementById("rsa-decrypt-btn");

  const publicKeyInput = document.getElementById("rsa-public-key");
  const privateKeyInput = document.getElementById("rsa-private-key");
  const rsaInput = document.getElementById("rsa-input");
  const rsaOutput = document.getElementById("rsa-output");

  // 2. Event listener untuk tombol "Buat Pasangan Kunci Baru"
  generateBtn.addEventListener("click", () => {
    // Inisialisasi JSEncrypt dengan ukuran kunci 2048 bit
    const crypt = new JSEncrypt({ default_key_size: 2048 });

    // Mendapatkan kunci publik dan privat dalam format PEM
    const publicKey = crypt.getPublicKey();
    const privateKey = crypt.getPrivateKey();

    // Menampilkan kunci pada textarea
    publicKeyInput.value = publicKey;
    privateKeyInput.value = privateKey;
    
    // Memberi tahu pengguna bahwa kunci telah dibuat
    rsaOutput.textContent = "Pasangan kunci Public & Private baru berhasil dibuat.";
    
    // Juga salin kunci ke bagian Super Encryption agar mudah digunakan
    document.getElementById("super-rsa-public").value = publicKey;
    document.getElementById("super-rsa-private").value = privateKey;
  });

  // 3. Event listener untuk tombol "Enkripsi"
  encryptBtn.addEventListener("click", () => {
    const text = rsaInput.value;
    const publicKey = publicKeyInput.value;

    // Validasi input
    if (!text || !publicKey) {
      alert("Pastikan Plaintext dan Kunci Publik sudah diisi!");
      return;
    }

    // Buat instance JSEncrypt
    const encrypt = new JSEncrypt();
    // Atur kunci publik yang akan digunakan
    encrypt.setPublicKey(publicKey);

    // Lakukan enkripsi
    const encrypted = encrypt.encrypt(text);

    // Tampilkan hasil atau pesan error jika enkripsi gagal
    if (encrypted) {
      rsaOutput.textContent = encrypted;
    } else {
      rsaOutput.textContent = "Enkripsi gagal. Pastikan format Kunci Publik benar.";
    }
  });

  // 4. Event listener untuk tombol "Dekripsi"
  decryptBtn.addEventListener("click", () => {
    const text = rsaInput.value;
    const privateKey = privateKeyInput.value;

    // Validasi input
    if (!text || !privateKey) {
      alert("Pastikan Ciphertext dan Kunci Privat sudah diisi!");
      return;
    }

    // Buat instance JSEncrypt
    const decrypt = new JSEncrypt();
    // Atur kunci privat yang akan digunakan
    decrypt.setPrivateKey(privateKey);

    // Lakukan dekripsi
    const decrypted = decrypt.decrypt(text);
    
    // Tampilkan hasil atau pesan error jika dekripsi gagal
    if (decrypted) {
      rsaOutput.textContent = decrypted;
    } else {
      rsaOutput.textContent = "Dekripsi gagal. Pastikan Ciphertext dan Kunci Privat benar.";
    }
  });
});