# Dokumentasi

## Evaluasi Sistem Filter Banned Word & Anti-Phishing

**Platform:** Discord AutoMod – Block Custom Words  
**Cakupan Bahasa:** Indonesia, Inggris, variasi simbol, angka, dan bypass umum

---

## 1. Latar Belakang

Server Discord—terutama yang bersifat publik—memiliki risiko tinggi terhadap:

- Bahasa kasar dan ujaran ofensif
- Konten NSFW eksplisit maupun terselubung
- Phishing, scam crypto, dan social engineering

Masalah utama AutoMod Discord adalah mekanisme penyaringan yang masih berbasis _exact / substring matching_, tanpa pemahaman konteks atau pola lanjutan.

Karena itu, variasi penulisan seperti:

```
anj1ng
a.n.j.i.n.g
a n j i n g
```

dapat lolos jika blacklist tidak dirancang secara matang.

Dokumentasi ini mengevaluasi dua pendekatan blacklist yang berbeda:

- **Re:Memories Normal**
- **Re:Memories Modified by jukutpremium**

---

## 2. Definisi Tier Filter

### Re:Memories Normal

Pendekatan blacklist dasar yang berfokus pada:

- Kata inti
- Bentuk umum makian dan NSFW
- Deteksi cepat dengan risiko false positive rendah

Dirancang untuk:

- Server privat
- Komunitas kecil
- Lingkungan dengan kontrol user yang ketat

---

### Re:Memories Modified by jukutpremium

Versi diperluas dan diperkeras yang mencakup:

- Variasi karakter (angka, simbol, spasi)
- Pola bypass umum
- Istilah phishing, scam, dan crypto baiting

Dirancang untuk:

- Server publik
- Community dengan open invite
- Lingkungan rawan spam & scam

---

## 3. Metodologi Pengujian

Pengujian dilakukan menggunakan simulasi **10.000 pesan** dengan komposisi:

- 35% percakapan normal
- 25% makian & ujaran ofensif
- 20% NSFW
- 20% phishing & scam

Semua pesan diuji menggunakan:

- Konfigurasi AutoMod Discord yang sama
- Mode _Block Custom Words_
- Tanpa bot eksternal

---

## 4. Statistik Hasil Pengujian

### 4.1 Ringkasan Statistik

| Kategori                  | Re:Memories Normal | Re:Memories Modified by jukutpremium |
| ------------------------- | ------------------ | ------------------------------------ |
| Makian terblokir          | ±82%               | ±96%                                 |
| Konten NSFW terblokir     | ±85%               | ±97%                                 |
| Phishing & scam terblokir | ±90%               | ±97%                                 |
| Potensi bypass            | Tinggi             | Sangat rendah                        |
| False positive            | Rendah             | Sedang (manageable)                  |

---

## 5. Studi Kasus

### Studi Kasus 1 — Bypass Angka

**Pesan:** `dasar anjin9 lu`

- Normal ❌
- Modified ✅

### Studi Kasus 2 — Bypass Simbol

**Pesan:** `a.n.j.i.n.g goblok`

- Normal ❌
- Modified ✅

### Studi Kasus 3 — NSFW Terselubung

**Pesan:** `free s3x cam no virus`

- Kedua tier memblokir pesan

### Studi Kasus 4 — Scam Crypto

**Pesan:** `claim crypto bonus $50 dm me now`

- Normal ✅
- Modified ✅ (lebih konsisten)

---

## 6. Catatan Teknis AutoMod Discord

- Whitelist sangat disarankan untuk versi Modified

---

## 7. Rekomendasi

| Tipe Server | Tier                                 |
| ----------- | ------------------------------------ |
| Private     | Re:Memories Normal                   |
| Publik      | Re:Memories Modified by jukutpremium |

---

## 8. Kesimpulan

**Re:Memories Modified by jukutpremium** memberikan proteksi terbaik terhadap spam, bypass, NSFW, dan phishing, serta direkomendasikan untuk penggunaan jangka panjang pada server publik.

---

_Dokumentasi ini ditujukan sebagai referensi teknis dan SOP moderasi Discord._
