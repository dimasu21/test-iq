// Bank Pertanyaan - Ratusan pertanyaan yang disusun berdasarkan kategori dan tingkat kesulitan
// Dikembangkan oleh Big Sam

const questionBank = {
  art: {
    easy: [
      { 
        q: "Emosi apa yang disampaikan oleh seni abstrak ini?", 
        options: ["Calm and Peace", "Chaos and Energy", "Sadness", "Fear"], 
        correct: 0,
        visual: {
          type: "abstract",
          shapes: [
            { type: "circle", x: 50, y: 50, r: 30, color: "#60a5fa", opacity: 0.6 },
            { type: "circle", x: 70, y: 60, r: 20, color: "#93c5fd", opacity: 0.5 },
            { type: "wave", color: "#3b82f6", amplitude: 10, frequency: 2 }
          ]
        }
      },
      { 
        q: "Apa yang dilambangkan oleh pola ini?", 
        options: ["Growth", "Decay", "Stability", "Conflict"], 
        correct: 0,
        visual: {
          type: "pattern",
          design: "spiral",
          colors: ["#10b981", "#34d399", "#6ee7b7"]
        }
      },
      { 
        q: "Seni geometris ini mewakili:", 
        options: ["Balance", "Imbalance", "Movement", "Stillness"], 
        correct: 0,
        visual: {
          type: "geometric",
          shapes: [
            { type: "rect", x: 30, y: 40, w: 40, h: 40, color: "#8b5cf6", rotation: 0 },
            { type: "rect", x: 70, y: 40, w: 40, h: 40, color: "#a78bfa", rotation: 0 }
          ]
        }
      },
      { 
        q: "Perasaan apa yang ditimbulkan oleh gradasi warna ini?", 
        options: ["Warmth", "Cold", "Neutral", "Harsh"], 
        correct: 0,
        visual: {
          type: "gradient",
          from: "#f59e0b",
          to: "#ef4444",
          direction: "radial"
        }
      },
      { 
        q: "Pola seperti mandala ini menunjukkan:", 
        options: ["Harmony", "Discord", "Speed", "Violence"], 
        correct: 0,
        visual: {
          type: "mandala",
          petals: 8,
          colors: ["#ec4899", "#f472b6", "#fbcfe8"]
        }
      },
    ],
    medium: [
      { 
        q: "Asimetri dalam komposisi ini menciptakan kesan:", 
        options: ["Tension", "Peace", "Boredom", "Joy"], 
        correct: 0,
        visual: {
          type: "abstract",
          shapes: [
            { type: "triangle", x1: 20, y1: 80, x2: 50, y2: 20, x3: 40, y3: 80, color: "#ef4444" },
            { type: "circle", x: 80, y: 30, r: 15, color: "#3b82f6" },
            { type: "rect", x: 70, y: 60, w: 20, h: 30, color: "#10b981", rotation: 25 }
          ]
        }
      },
      { 
        q: "Pola yang tumpang tindih ini menciptakan ilusi:", 
        options: ["Depth", "Flatness", "Transparency", "Opacity"], 
        correct: 0,
        visual: {
          type: "overlap",
          shapes: [
            { type: "circle", x: 40, y: 50, r: 30, color: "#8b5cf6", opacity: 0.5 },
            { type: "circle", x: 60, y: 50, r: 30, color: "#ec4899", opacity: 0.5 },
            { type: "circle", x: 50, y: 65, r: 30, color: "#f59e0b", opacity: 0.5 }
          ]
        }
      },
      { 
        q: "Aliran arah seni ini bergerak ke:", 
        options: ["Upward", "Downward", "Circular", "Static"], 
        correct: 0,
        visual: {
          type: "flow",
          arrows: [
            { x: 50, y: 80, direction: "up", color: "#00ff88" },
            { x: 40, y: 60, direction: "up", color: "#00d4ff" },
            { x: 60, y: 60, direction: "up", color: "#8b5cf6" }
          ]
        }
      },
      { 
        q: "Pola ini mengikuti prinsip seni yang mana?", 
        options: ["Golden Ratio", "Rule of Thirds", "Symmetry", "Chaos"], 
        correct: 2,
        visual: {
          type: "symmetry",
          axis: "vertical",
          colors: ["#6366f1", "#8b5cf6", "#a78bfa"]
        }
      },
      { 
        q: "Kontras dalam karya ini menekankan:", 
        options: ["Duality", "Unity", "Simplicity", "Complexity"], 
        correct: 0,
        visual: {
          type: "contrast",
          left: "#000000",
          right: "#ffffff",
          blend: "#808080"
        }
      },
    ],
    hard: [
      { 
        q: "Komposisi yang terinspirasi kubisme ini membongkar:", 
        options: ["Perspective", "Color", "Texture", "Sound"], 
        correct: 0,
        visual: {
          type: "cubist",
          fragments: 12,
          colors: ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"]
        }
      },
      { 
        q: "Ruang negatif dalam karya seni ini mewakili:", 
        options: ["The unseen", "Emptiness", "Fullness", "Nothing"], 
        correct: 0,
        visual: {
          type: "negative",
          subject: "vase-faces",
          colors: ["#1e293b", "#ffffff"]
        }
      },
      { 
        q: "Pola rekursif ini menunjukkan:", 
        options: ["Self-similarity", "Randomness", "Linear growth", "Decay"], 
        correct: 0,
        visual: {
          type: "fractal",
          iterations: 4,
          colors: ["#00ff88", "#00d4ff", "#8b5cf6"]
        }
      },
      { 
        q: "Prinsip Gestalt yang ditunjukkan di sini adalah:", 
        options: ["Closure", "Proximity", "Similarity", "Continuity"], 
        correct: 0,
        visual: {
          type: "gestalt",
          principle: "closure",
          incomplete: true
        }
      },
      { 
        q: "Komposisi minimalis ini menyampaikan makna melalui:", 
        options: ["Absence", "Presence", "Color", "Texture"], 
        correct: 0,
        visual: {
          type: "minimal",
          elements: 2,
          colors: ["#1e293b", "#00ff88"]
        }
      },
    ]
  },
  logic: {
    easy: [
      { q: "Jika semua Bloop adalah Razzy dan semua Razzy adalah Lazzy, maka semua Bloop pasti Lazzy?", options: ["Benar", "Salah", "Tidak dapat ditentukan", "Terkadang"], correct: 0, hint: "Pikirkan tentang sifat transitif: jika A→B dan B→C, maka A→C" },
      { q: "Apa yang berikutnya dalam urutan: 2, 4, 6, 8, __?", options: ["9", "10", "11", "12"], correct: 1, hint: "Lihat polanya: setiap angka bertambah 2" },
      { q: "Jika dibutuhkan 5 mesin dalam 5 menit untuk membuat 5 widget, berapa menit yang dibutuhkan 100 mesin untuk membuat 100 widget?", options: ["100", "5", "20", "500"], correct: 1, hint: "Setiap mesin membuat 1 widget dalam 5 menit, terlepas dari jumlahnya" },
      { q: "Seorang petani memiliki 17 domba. Semuanya mati kecuali 9. Berapa domba yang tersisa?", options: ["8", "9", "17", "0"], correct: 1, hint: "'Semuanya kecuali 9' berarti 9 selamat" },
      { q: "Kata mana yang TIDAK termasuk kelompoknya: Apel, Jeruk, Pisang, Wortel?", options: ["Apel", "Jeruk", "Pisang", "Wortel"], correct: 3, hint: "Tiga adalah buah, satu adalah sayuran" },
      { q: "Jika Anda menyusun ulang 'CIFAIPC', Anda akan mendapatkan nama sebuah:", options: ["Kota", "Hewan", "Samudra", "Negara"], correct: 2, hint: "Coba susun ulang hurufnya: P-A-C-I-F-I-C" },
      { q: "Anak Senin berwajah ceria. Jika hari ini Senin, hari apa kemarin?", options: ["Selasa", "Minggu", "Sabtu", "Jumat"], correct: 1, hint: "Minggu datang sebelum Senin" },
      { q: "Berapa bulan yang memiliki 28 hari?", options: ["1", "6", "12", "Semua bulan"], correct: 3, hint: "Setiap bulan memiliki setidaknya 28 hari" },
      { q: "Seorang pelayan di toko daging bertinggi badan 178 cm. Apa yang dia timbang?", options: ["Daging", "80 kg", "70 kg", "Mustahil diketahui"], correct: 0, hint: "Apa yang ditimbang oleh pelayan toko daging untuk pelanggan?" },
      { q: "Jika ada 3 apel dan Anda mengambil 2, berapa banyak yang Anda miliki?", options: ["1", "2", "3", "0"], correct: 1, hint: "Anda MENGAMBIL 2, jadi Anda punya 2" },
    ],
    medium: [
      { q: "Jika beberapa Glink adalah Blink, dan semua Blink adalah Dink, maka beberapa Glink pasti Dink?", options: ["Benar", "Salah", "Tidak dapat ditentukan", "Hanya pada hari Selasa"], correct: 0 },
      { q: "Apa angka berikutnya: 1, 1, 2, 3, 5, 8, __?", options: ["11", "12", "13", "14"], correct: 2 },
      { q: "Ayah Mary memiliki 5 anak perempuan: Nana, Nene, Nini, Nono. Siapa nama anak ke-5?", options: ["Nunu", "Mary", "Nana", "Tidak ada"], correct: 1 },
      { q: "Tongkat dan bola harganya total $1.10. Tongkat harganya $1 lebih mahal dari bola. Berapa harga bola?", options: ["$0.10", "$0.05", "$0.15", "$0.01"], correct: 1 },
      { q: "Apa yang tidak biasa dari kalimat ini: 'The quick brown fox jumps over the lazy dog'?", options: ["Gramatika salah", "Mengandung semua 26 huruf", "Ini adalah pertanyaan", "Tidak ada yang tidak biasa"], correct: 1 },
      { q: "Jika Anda memiliki kubus yang dicat merah di semua sisi dan dipotong menjadi 27 kubus kecil, berapa banyak kubus kecil yang memiliki tepat 2 sisi merah?", options: ["6", "8", "12", "18"], correct: 2 },
      { q: "Lengkapi: Siku adalah untuk lengan seperti lutut adalah untuk ___", options: ["Kaki", "Tungkai", "Pergelangan kaki", "Paha"], correct: 1 },
      { q: "Jika ROSE dikodekan sebagai 6821, CHAIR dikodekan sebagai 73456, apa kode untuk SEARCH?", options: ["214673", "214763", "216473", "216743"], correct: 0 },
      { q: "Angka berapa yang harus menggantikan tanda tanya: 3, 6, 11, 18, 27, ?", options: ["36", "38", "40", "42"], correct: 1 },
      { q: "Jika dua juru ketik dapat mengetik dua halaman dalam dua menit, berapa banyak juru ketik yang dibutuhkan untuk mengetik 18 halaman dalam enam menit?", options: ["3", "6", "12", "18"], correct: 1 },
    ],
    hard: [
      { q: "Dalam balapan, Anda menyalip orang di posisi ke-2. Di posisi mana Anda sekarang?", options: ["1st", "2nd", "3rd", "Last"], correct: 1 },
      { q: "Apa yang 3/7 ayam (chicken), 2/3 kucing (cat), dan 2/4 kambing (goat)?", options: ["Chicago", "Peternakan", "Bukan apa-apa", "Hewan ternak"], correct: 0 },
      { q: "Jika semua A adalah B, tidak ada B yang C, dan beberapa C adalah D, mana yang BENAR?", options: ["All A are D", "No A are C", "Some D are A", "All D are B"], correct: 1 },
      { q: "Jam matahari adalah jam dengan bagian bergerak paling sedikit. Apa yang paling banyak?", options: ["Digital clock", "Atomic clock", "Hourglass", "Grandfather clock"], correct: 2 },
      { q: "Kata 5 huruf apa yang menjadi lebih pendek (shorter) saat Anda menambahkan 2 huruf?", options: ["Small", "Short", "Terse", "Brief"], correct: 1 },
      { q: "Berapa kali Anda bisa mengurangi 5 dari 25?", options: ["5", "1", "25", "Tak terhingga"], correct: 1 },
      { q: "Apa yang semakin basah saat semakin mengeringkan?", options: ["Spons", "Handuk", "Kertas", "Pasir"], correct: 1 },
      { q: "Aku punya kota tapi tak punya rumah, hutan tapi tak punya pohon, air tapi tak punya ikan. Apa aku?", options: ["Mimpi", "Peta", "Lukisan", "Cerita"], correct: 1 },
      { q: "Jika Anda memilikinya, Anda tidak membaginya. Jika Anda membaginya, Anda tidak memilikinya. Apa itu?", options: ["Cinta", "Uang", "Rahasia", "Waktu"], correct: 2 },
      { q: "Semakin banyak Anda mengambil, semakin banyak Anda meninggalkan. Apa aku?", options: ["Kenangan", "Jejak kaki", "Foto", "Waktu"], correct: 1 },
    ]
  },
  math: {
    easy: [
      { q: "Berapakah 15% dari 200?", options: ["15", "20", "30", "35"], correct: 2 },
      { q: "Jika x + 5 = 12, berapakah x?", options: ["5", "6", "7", "8"], correct: 2 },
      { q: "Berapakah akar kuadrat dari 144?", options: ["11", "12", "13", "14"], correct: 1 },
      { q: "Berapakah 3² + 4²?", options: ["12", "25", "7", "49"], correct: 1 },
      { q: "Jika segitiga memiliki sudut 45° dan 90°, berapakah sudut ketiganya?", options: ["45°", "55°", "35°", "65°"], correct: 0 },
      { q: "Berapakah 0.75 dalam bentuk pecahan?", options: ["1/4", "2/3", "3/4", "4/5"], correct: 2 },
      { q: "Berapakah bilangan prima berikutnya setelah 7?", options: ["8", "9", "10", "11"], correct: 3 },
      { q: "Jika 2x = 10, berapakah x?", options: ["2", "4", "5", "8"], correct: 2 },
      { q: "Berapakah keliling persegi dengan sisi 5?", options: ["10", "15", "20", "25"], correct: 2 },
      { q: "Berapakah 8 ÷ 0.5?", options: ["4", "8", "16", "0.0625"], correct: 2 },
    ],
    medium: [
      { q: "Berapakah 2³ × 3²?", options: ["36", "48", "72", "96"], correct: 2 },
      { q: "Jika rasio laki-laki dan perempuan adalah 3:5 dan ada 24 laki-laki, berapa banyak perempuan yang ada?", options: ["30", "35", "40", "45"], correct: 2 },
      { q: "Berapakah luas lingkaran dengan jari-jari 7? (π ≈ 22/7)", options: ["44", "154", "308", "616"], correct: 1 },
      { q: "Selesaikan: 2x + 3 = 15", options: ["4", "5", "6", "7"], correct: 2 },
      { q: "Berapakah log₁₀(1000)?", options: ["2", "3", "4", "10"], correct: 1 },
      { q: "Jika mobil berjalan 60 km/jam, seberapa jauh ia berjalan dalam 2.5 jam?", options: ["120 km", "140 km", "150 km", "160 km"], correct: 2 },
      { q: "Berapakah nilai 5! (5 faktorial)?", options: ["25", "60", "120", "720"], correct: 2 },
      { q: "Sebuah jaket harganya $80 setelah diskon 20%. Berapa harga aslinya?", options: ["$96", "$100", "$104", "$110"], correct: 1 },
      { q: "Berapakah jumlah sudut dalam segi enam?", options: ["540°", "720°", "900°", "1080°"], correct: 1 },
      { q: "Jika √x = 9, berapakah x?", options: ["3", "18", "27", "81"], correct: 3 },
    ],
    hard: [
      { q: "Berapakah turunan dari x³ + 2x²?", options: ["3x² + 4x", "3x² + 2x", "x² + 4x", "3x + 4x"], correct: 0 },
      { q: "Dalam deret geometri: 2, 6, 18, ..., berapakah suku ke-6?", options: ["162", "324", "486", "972"], correct: 2 },
      { q: "Berapakah ∫2x dx?", options: ["x²", "x² + C", "2x²", "2x² + C"], correct: 1 },
      { q: "Berapakah peluang mendapatkan jumlah 7 dengan dua dadu?", options: ["1/6", "1/9", "5/36", "1/12"], correct: 0 },
      { q: "Jika sin θ = 0.5, berapakah θ dalam derajat?", options: ["15°", "30°", "45°", "60°"], correct: 1 },
      { q: "Berapakah nilai i² di mana i adalah unit imajiner?", options: ["1", "-1", "i", "-i"], correct: 1 },
      { q: "Berapa banyak cara 5 orang dapat duduk berderet?", options: ["25", "60", "120", "720"], correct: 2 },
      { q: "Berapakah limit dari (1 + 1/n)ⁿ saat n → ∞?", options: ["1", "2", "e", "∞"], correct: 2 },
      { q: "Jumlah n bilangan asli pertama adalah n(n+1)/2. Berapakah n jika jumlah = 55?", options: ["9", "10", "11", "12"], correct: 1 },
      { q: "Berapakah 2⁸ mod 7?", options: ["1", "2", "4", "6"], correct: 2 },
    ]
  },
  spatial: {
    easy: [
      { q: "Berapa banyak sisi yang dimiliki kubus?", options: ["4", "6", "8", "12"], correct: 1, visual: "cube" },
      { q: "Jika Anda melipat selembar kertas menjadi dua sebanyak 3 kali, berapa banyak persegi panjang yang dihasilkan saat dibuka?", options: ["4", "6", "8", "16"], correct: 2 },
      { q: "Bentuk mana yang memiliki sisi terbanyak: segitiga, persegi, segi lima, segi enam?", options: ["Segitiga", "Persegi", "Segi lima", "Segi enam"], correct: 3 },
      { q: "Berapa banyak rusuk yang dimiliki kubus?", options: ["6", "8", "10", "12"], correct: 3 },
      { q: "Bentuk 3D apa yang memiliki 1 permukaan melengkung dan 2 permukaan datar?", options: ["Kerucut", "Silinder", "Bola", "Piramida"], correct: 1 },
      { q: "Jika Anda melihat kubus tepat dari atas, bentuk apa yang Anda lihat?", options: ["Lingkaran", "Segitiga", "Persegi", "Persegi panjang"], correct: 2 },
      { q: "Berapa banyak sudut siku-siku dalam persegi panjang?", options: ["2", "3", "4", "6"], correct: 2 },
      { q: "Segitiga dengan semua sisi sama disebut?", options: ["Sama kaki", "Sembarang", "Sama sisi", "Siku-siku"], correct: 2 },
      { q: "Apa bentuk rambu berhenti (stop sign)?", options: ["Segi enam", "Segi lima", "Segi delapan", "Segi sepuluh"], correct: 2 },
      { q: "Berapa banyak titik sudut yang dimiliki segitiga?", options: ["2", "3", "4", "5"], correct: 1 },
    ],
    medium: [
      { q: "Berapa banyak kubus kecil yang membentuk kubus 3×3×3?", options: ["9", "18", "27", "36"], correct: 2 },
      { q: "Jika Anda memutar huruf 'N' 180°, huruf apa yang Anda dapatkan?", options: ["Z", "N", "U", "M"], correct: 1 },
      { q: "Sebuah dodekahedron memiliki berapa banyak sisi?", options: ["8", "10", "12", "20"], correct: 2 },
      { q: "Berapa jumlah warna minimum yang dibutuhkan untuk mewarnai peta sehingga tidak ada wilayah yang berdekatan berbagi warna?", options: ["3", "4", "5", "6"], correct: 1 },
      { q: "Berapa banyak garis simetri yang dimiliki segi enam beraturan?", options: ["4", "5", "6", "12"], correct: 2 },
      { q: "Jika Anda memutar huruf 'N' 180°, huruf apa yang Anda dapatkan?", options: ["Z", "N", "U", "M"], correct: 1 },
      { q: "Pita Möbius memiliki berapa sisi?", options: ["0", "1", "2", "3"], correct: 1 },
      { q: "Bentuk apa yang terbentuk dengan memutar persegi panjang di sekitar sisi terpanjangnya?", options: ["Bola", "Silinder", "Kerucut", "Torus"], correct: 1 },
      { q: "Berapa banyak diagonal yang dimiliki segi enam?", options: ["6", "9", "12", "15"], correct: 1 },
      { q: "Bola sepak adalah contoh dari bangun ruang apa?", options: ["Icosahedron", "Dodecahedron", "Truncated icosahedron", "Cuboctahedron"], correct: 2 },
    ],
    hard: [
      { q: "Berapa banyak sisi yang dimiliki ikosahedron?", options: ["12", "16", "20", "24"], correct: 2 },
      { q: "Dalam ruang 4D, apa analog 4D dari kubus disebut?", options: ["Hypercube", "Tesseract", "Both", "Hypersphere"], correct: 2 },
      { q: "Berapa banyak rusuk yang dimiliki dodekahedron?", options: ["20", "24", "30", "36"], correct: 2 },
      { q: "Karakteristik Euler (V-E+F) untuk polihedron sederhana adalah?", options: ["0", "1", "2", "3"], correct: 2 },
      { q: "Botol Klein memiliki berapa sisi?", options: ["0", "1", "2", "Tak terhingga"], correct: 1 },
      { q: "Ada berapa banyak bangun ruang Platonik (platonic solids)?", options: ["4", "5", "6", "Tak terhingga"], correct: 1 },
      { q: "Bentuk apa yang Anda dapatkan saat membelah torus melalui tengahnya secara horizontal?", options: ["Circle", "Two circles", "Vesica piscis", "Oval"], correct: 1 },
      { q: "Berapa banyak titik sudut yang dimiliki oktahedron?", options: ["4", "6", "8", "12"], correct: 1 },
      { q: "Dodekahedron berbintang memiliki berapa banyak titik?", options: ["12", "20", "30", "60"], correct: 0 },
      { q: "Dual dari kubus adalah?", options: ["Cube", "Tetrahedron", "Octahedron", "Icosahedron"], correct: 2 },
    ]
  },
  pattern: {
    easy: [
      { q: "Apa yang berikutnya: A, C, E, G, __?", options: ["H", "I", "J", "K"], correct: 1 },
      { q: "Lanjutkan: 1, 4, 9, 16, __?", options: ["20", "25", "30", "36"], correct: 1 },
      { q: "Apa berikutnya: ○, ○○, ○○○, ____?", options: ["○○○", "○○○○", "○○", "○"], correct: 1 },
      { q: "Lengkapi: AB, BC, CD, __?", options: ["DE", "EF", "DC", "DD"], correct: 0 },
      { q: "Apa yang berikutnya: 2, 6, 12, 20, __?", options: ["28", "30", "32", "36"], correct: 1 },
      { q: "Lanjutkan: RED, ORANGE, YELLOW, __?", options: ["BLUE", "GREEN", "VIOLET", "INDIGO"], correct: 1 },
      { q: "Apa yang hilang: 5, 10, __, 20, 25?", options: ["12", "14", "15", "18"], correct: 2 },
      { q: "Lengkapi polanya: Z, Y, X, __?", options: ["V", "W", "A", "B"], correct: 1 },
      { q: "Apa yang berikutnya: 3, 7, 11, 15, __?", options: ["17", "18", "19", "21"], correct: 2 },
      { q: "Lanjutkan: Jan, Mar, May, __?", options: ["Jun", "Jul", "Aug", "Sep"], correct: 1 },
    ],
    medium: [
      { q: "Apa yang berikutnya: 1, 1, 2, 3, 5, 8, __?", options: ["11", "12", "13", "15"], correct: 2 },
      { q: "Lengkapi: 2, 3, 5, 7, 11, __?", options: ["12", "13", "14", "15"], correct: 1 },
      { q: "Apa berikutnya: 1, 8, 27, 64, __?", options: ["81", "100", "125", "216"], correct: 2 },
      { q: "Lanjutkan: AZ, BY, CX, __?", options: ["DW", "DU", "EW", "EV"], correct: 0 },
      { q: "Apa yang berikutnya: 2, 6, 14, 30, __?", options: ["46", "54", "62", "70"], correct: 2 },
      { q: "Lengkapi: 1, 2, 4, 7, 11, __?", options: ["14", "15", "16", "17"], correct: 2 },
      { q: "Apa berikutnya: O, T, T, F, F, S, S, __?", options: ["E", "N", "T", "S"], correct: 0 },
      { q: "Lanjutkan: 144, 121, 100, 81, __?", options: ["49", "64", "72", "56"], correct: 1 },
      { q: "Apa yang berikutnya: ACE, BDF, CEG, __?", options: ["DFH", "DEG", "CFH", "DEF"], correct: 0 },
      { q: "Lengkapi: 2, 5, 10, 17, __?", options: ["24", "26", "28", "30"], correct: 1 },
    ],
    hard: [
      { q: "Apa yang berikutnya: 1, 11, 21, 1211, 111221, __?", options: ["312211", "11112211", "1211111", "22111"], correct: 0 },
      { q: "Lengkapi: 0, 1, 1, 2, 3, 5, 8, 13, 21, __?", options: ["26", "29", "34", "40"], correct: 2 },
      { q: "Apa berikutnya: 2, 12, 36, 80, __?", options: ["120", "150", "180", "210"], correct: 1 },
      { q: "Lanjutkan: 3, 3, 5, 4, 4, 3, 5, __?", options: ["3", "4", "5", "6"], correct: 2 },
      { q: "Apa yang berikutnya: 1, 3, 6, 10, 15, __?", options: ["18", "20", "21", "24"], correct: 2 },
      { q: "Lengkapi urutan: 1, 4, 13, 40, __?", options: ["80", "100", "121", "160"], correct: 2 },
      { q: "Apa polanya: 8, 5, 4, 9, 1, 7, 6, __?", options: ["2", "3", "10", "11"], correct: 1 },
      { q: "Lanjutkan: F, S, T, F, F, S, S, E, __?", options: ["N", "T", "E", "S"], correct: 0 },
      { q: "Apa yang berikutnya: 6, 28, 496, __?", options: ["2016", "8128", "8256", "9124"], correct: 1 },
      { q: "Lengkapi: 31, 28, 31, 30, 31, 30, __?", options: ["28", "29", "30", "31"], correct: 3 },
    ]
  },
  verbal: {
    easy: [
      { q: "Which word is the opposite of 'ABUNDANT'?", options: ["Plentiful", "Scarce", "Ample", "Copious"], correct: 1 },
      { q: "BOOK is to READING as FORK is to?", options: ["Drawing", "Eating", "Writing", "Cooking"], correct: 1 },
      { q: "Find the odd one out: Run, Walk, Sit, Jog", options: ["Run", "Walk", "Sit", "Jog"], correct: 2 },
      { q: "Which word means the same as 'HAPPY'?", options: ["Sad", "Joyful", "Angry", "Tired"], correct: 1 },
      { q: "BIRD is to NEST as BEE is to?", options: ["Honey", "Hive", "Flower", "Sting"], correct: 1 },
      { q: "Which word doesn't belong: Dog, Cat, Apple, Horse?", options: ["Dog", "Cat", "Apple", "Horse"], correct: 2 },
      { q: "Complete: HOT is to COLD as WET is to?", options: ["Water", "Rain", "Dry", "Humid"], correct: 2 },
      { q: "Find the synonym of 'BIG':", options: ["Small", "Large", "Tiny", "Mini"], correct: 1 },
      { q: "DOCTOR is to PATIENT as TEACHER is to?", options: ["School", "Student", "Book", "Class"], correct: 1 },
      { q: "Which word means the opposite of 'FAST'?", options: ["Quick", "Slow", "Rapid", "Swift"], correct: 1 },
    ],
    medium: [
      { q: "VERBOSE is the opposite of?", options: ["Wordy", "Concise", "Lengthy", "Talkative"], correct: 1 },
      { q: "Complete: BUTTERFLY is to INSECT as SALMON is to?", options: ["Water", "Fish", "Ocean", "Swimming"], correct: 1 },
      { q: "Find the odd one: Crimson, Scarlet, Azure, Vermilion", options: ["Crimson", "Scarlet", "Azure", "Vermilion"], correct: 2 },
      { q: "EPHEMERAL means?", options: ["Eternal", "Short-lived", "Beautiful", "Dangerous"], correct: 1 },
      { q: "CHAPTER is to BOOK as VERSE is to?", options: ["Rhyme", "Poetry", "Poem", "Song"], correct: 2 },
      { q: "Which word is MOST similar to 'UBIQUITOUS'?", options: ["Rare", "Omnipresent", "Unique", "Sporadic"], correct: 1 },
      { q: "Find the antonym of 'BENEVOLENT':", options: ["Kind", "Generous", "Malevolent", "Charitable"], correct: 2 },
      { q: "WATER is to THIRST as FOOD is to?", options: ["Eat", "Hunger", "Cook", "Meal"], correct: 1 },
      { q: "Which word doesn't fit: Jubilant, Ecstatic, Morose, Elated?", options: ["Jubilant", "Ecstatic", "Morose", "Elated"], correct: 2 },
      { q: "ENIGMA is closest in meaning to?", options: ["Answer", "Mystery", "Solution", "Clarity"], correct: 1 },
    ],
    hard: [
      { q: "PUSILLANIMOUS means?", options: ["Brave", "Cowardly", "Generous", "Angry"], correct: 1 },
      { q: "ICONOCLAST is to TRADITION as REVOLUTIONARY is to?", options: ["Change", "Status quo", "Progress", "Innovation"], correct: 1 },
      { q: "Find the odd word: Obsequious, Sycophantic, Supercilious, Servile", options: ["Obsequious", "Sycophantic", "Supercilious", "Servile"], correct: 2 },
      { q: "PERSPICACIOUS means having?", options: ["Sweat", "Keen insight", "Bad luck", "Clear skin"], correct: 1 },
      { q: "ENERVATE is to INVIGORATE as MITIGATE is to?", options: ["Soothe", "Calm", "Exacerbate", "Alleviate"], correct: 2 },
      { q: "SOLECISM refers to?", options: ["Sun worship", "Grammatical error", "Solar energy", "Social grace"], correct: 1 },
      { q: "Which is NOT a synonym of 'CAPRICIOUS'?", options: ["Fickle", "Whimsical", "Steadfast", "Mercurial"], correct: 2 },
      { q: "PARSIMONIOUS is closest to?", options: ["Generous", "Stingy", "Religious", "Partial"], correct: 1 },
      { q: "VITUPERATIVE means?", options: ["Full of life", "Abusive", "Victorious", "Virtuous"], correct: 1 },
      { q: "SESQUIPEDALIAN relates to?", options: ["Long words", "Six-legged creatures", "Ancient history", "Sequential events"], correct: 0 },
    ]
  },
  memory: {
    easy: [
      { q: "Ingat urutan ini: 3, 7, 2. Apa angka kedua tadi?", options: ["3", "7", "2", "5"], correct: 1 },
      { q: "Hafalkan: APPLE, HOUSE, RIVER. Kata mana yang di tengah?", options: ["APPLE", "HOUSE", "RIVER", "TREE"], correct: 1 },
      { q: "Ingat: 🔴🟢🔵. Warna apa yang pertama?", options: ["Red", "Green", "Blue", "Yellow"], correct: 2 },
      { q: "Ingat: CAT, DOG, BIRD, FISH. Berapa banyak hewan yang disebutkan?", options: ["3", "4", "5", "6"], correct: 1 },
      { q: "Ingat: 5 + 3 = 8. Apa angka pertamanya?", options: ["3", "5", "8", "2"], correct: 1 },
      { q: "Hafalkan: MONDAY, FRIDAY, SUNDAY. Hari mana yang TIDAK disebutkan?", options: ["Monday", "Tuesday", "Friday", "Sunday"], correct: 1 },
      { q: "Ingat: 9, 4, 7, 1. Apa angka terbesarnya?", options: ["4", "7", "9", "1"], correct: 2 },
      { q: "Ingat: TREE, LEAF, ROOT, BRANCH. Apa kata pertamanya?", options: ["LEAF", "ROOT", "TREE", "BRANCH"], correct: 2 },
      { q: "Hafalkan: ★☆★☆. Berapa banyak bintang berisi tadi?", options: ["1", "2", "3", "4"], correct: 1 },
      { q: "Ingat: 2 × 4 = 8. Operasi apa yang digunakan?", options: ["Addition", "Subtraction", "Multiplication", "Division"], correct: 2 },
    ],
    medium: [
      { q: "Ingat: 4, 8, 3, 9, 2. Apa angka ketiga tadi?", options: ["4", "8", "3", "9"], correct: 2 },
      { q: "Hafalkan: ELEPHANT, GIRAFFE, ZEBRA, LION, TIGER. Hewan ke-4 apa?", options: ["ZEBRA", "LION", "TIGER", "ELEPHANT"], correct: 1 },
      { q: "Ingat: 🟡🔴🟢🔵🟣. Warna apa di antara hijau dan ungu?", options: ["Red", "Yellow", "Blue", "Green"], correct: 2 },
      { q: "Ingat: BREAD, MILK, EGGS, CHEESE, BUTTER. Apa yang muncul setelah MILK?", options: ["BREAD", "EGGS", "CHEESE", "BUTTER"], correct: 1 },
      { q: "Hafalkan: 17, 34, 51, 68, 85. Apa angka di tengah?", options: ["34", "51", "68", "17"], correct: 1 },
      { q: "Ingat: PARIS, LONDON, TOKYO, SYDNEY, CAIRO. Kota ke-3 apa?", options: ["LONDON", "TOKYO", "SYDNEY", "PARIS"], correct: 1 },
      { q: "Ingat: A1, B2, C3, D4, E5. Huruf apa yang dipasangkan dengan 4?", options: ["C", "D", "E", "B"], correct: 1 },
      { q: "Hafalkan: ♠♥♦♣♠. Berapa banyak kartu sekop (spades) muncul?", options: ["1", "2", "3", "4"], correct: 1 },
      { q: "Ingat: SUN, MOON, STAR, PLANET, COMET. Apa sebelum STAR?", options: ["SUN", "MOON", "PLANET", "COMET"], correct: 1 },
      { q: "Ingat: 6, 12, 18, 24, 30. Apa berikutnya?", options: ["32", "34", "36", "38"], correct: 2 },
    ],
    hard: [
      { q: "Hafalkan: 7, 3, 9, 1, 5, 8, 2, 6. Apa angka ke-5 tadi?", options: ["1", "5", "8", "2"], correct: 1 },
      { q: "Ingat: QUANTUM, NEBULA, COSMOS, PHOTON, QUASAR, PULSAR. Kata mana yang punya 6 huruf?", options: ["NEBULA", "COSMOS", "PHOTON", "QUASAR"], correct: 2 },
      { q: "Ingat: 🟦🟨🟥🟩🟧🟪🟫. Warna apa yang ke-4 dari kanan?", options: ["Orange", "Green", "Red", "Yellow"], correct: 1 },
      { q: "Hafalkan: 13, 27, 41, 58, 79, 86, 92. Berapa jumlah angka pertama dan terakhir?", options: ["100", "105", "110", "92"], correct: 1 },
      { q: "Ingat: ALPHA, BETA, GAMMA, DELTA, EPSILON, ZETA. Apa yang muncul 2 posisi setelah GAMMA?", options: ["DELTA", "EPSILON", "ZETA", "BETA"], correct: 1 },
      { q: "Ingat: ★☆★★☆★☆☆. Berapa banyak bintang kosong tadi?", options: ["3", "4", "5", "6"], correct: 1 },
      { q: "Hafalkan: FIBONACCI: 1,1,2,3,5,8,13. Suku ke-6 apa?", options: ["5", "8", "13", "21"], correct: 1 },
      { q: "Ingat: K9M2T7P4. Huruf apa yang dipasangkan dengan 7?", options: ["K", "M", "T", "P"], correct: 2 },
      { q: "Ingat polanya: AABCCCDDDDE. Ada berapa huruf D?", options: ["3", "4", "5", "6"], correct: 1 },
      { q: "Hafalkan: 256, 128, 64, 32, 16, 8. Angka berapa yang hilang jika 4 ada setelah 8?", options: ["2", "1", "Nothing", "0"], correct: 2 },
    ]
  }
};

// Kategori IQ dan iconnya
// Dikembangkan oleh Big Sam
const categories = {
  art: { name: "Interpretasi Seni", icon: "🎨", color: "pink" },
  logic: { name: "Logika", icon: "🧩", color: "emerald" },
  math: { name: "Matematika", icon: "🔢", color: "cyan" },
  spatial: { name: "Spasial", icon: "📐", color: "violet" },
  pattern: { name: "Pola", icon: "🔄", color: "amber" },
  verbal: { name: "Verbal", icon: "📝", color: "rose" },
  memory: { name: "Memori", icon: "🧠", color: "indigo" }
};

// Bobot kesulitan
// Dikembangkan oleh Big Sam
const difficultyWeights = { easy: 1, medium: 1.5, hard: 2 };
const difficultyColors = { easy: "emerald", medium: "amber", hard: "rose" };
