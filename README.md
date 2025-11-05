# Yılan Oyunu - Ürün Gereksinimleri Dokümanı (PRD)

---

## 1. Proje Özeti ve Amaç

Bu projenin amacı, popüler `.io` oyunlarından (özellikle slither.io) esinlenerek modern, akıcı ve bağımlılık yaratan bir yılan oyunu geliştirmektir. Oyun, web tarayıcısı üzerinden erişilebilir olacak ve oyunculara basit kontrollere sahip, ancak ustalaşması zorlu bir deneyim sunacaktır. Temel hedef, oyuncuların en yüksek skoru elde etmeye çalıştığı, dinamik ve eğlenceli bir oyun ortamı yaratmaktır.

## 2. Hedef Kitle

- Hızlı ve eğlenceli oyun deneyimleri arayan her yaştan gündelik (casual) oyuncular.
- Rekabeti seven ve liderlik tablosunda yükselmek isteyen oyuncular.
- `.io` tarzı oyunları seven ve benzer mekaniklere sahip yeni bir alternatif arayanlar.

## 3. Temel Özellikler ve Mekanikler

### 3.1. Oyun Alanı ve Kamera
- **Dinamik Oyun Alanı:** Oyun, tarayıcı penceresini tamamen kaplayan geniş bir alanda oynanacaktır.
- **Takip Kamerası:** Kamera, oyuncunun kontrol ettiği yılanı merkez alarak hareket edecektir. Bu, oyuncuya sürekli olarak yılanın çevresini keşfetme hissi verecektir.
- **Pikselleşmeyen Grafikler:** Oyun, vektörel veya yüksek çözünürlüklü grafikler kullanarak pürüzsüz bir görsel deneyim sunacak, pikseller belirgin olmayacaktır.

### 3.2. Yılan Kontrolü ve Hareket
- **Yönlendirme:** Yılan, klavyedeki yön tuşları (`Yukarı`, `Aşağı`, `Sağ`, `Sol`) veya `W, A, S, D` tuşları ile kontrol edilecektir.
- **Hızlanma Mekaniği:** Oyuncu, bir yön tuşuna basılı tuttuğunda yılan hızlanacaktır.
- **Hızlanma Bedeli:** Yılan hızlandığı süre boyunca oyuncunun toplam puanı saniyede belirli bir miktar azalacaktır. Bu, hızlanmayı stratejik bir karar haline getirecektir.

### 3.3. Beslenme ve Büyüme
- **Standart Yiyecek (Meyveler):** Haritada rastgele beliren meyveler, yılana **1 puan** kazandırır ve yılanın boyutunu standart miktarda artırır.
- **Özel Yiyecek (Pastalar):**
    - Haritada nadir olarak belirirler.
    - Yenildiğinde **5 puan** kazandırırlar.
    - Yılanın boyutunu meyvelere göre **daha fazla** artırırlar.

### 3.4. Oyun Kuralları ve Ölüm
- **Başlangıç Koruması:** Oyuncu oyuna başladığında ilk **5-10 saniye** boyunca ölümsüz olacaktır. Bu süre zarfında kendi vücuduna çarpması oyunu sonlandırmaz.
- **Duvarlara Çarpma:** Yılan, oyun alanının sınırlarına (duvarlara) çarptığında ölür ve oyun sona erer.
- **Kendine Çarpma:** Başlangıç koruması bittikten sonra yılan kendi vücuduna çarparsa ölür ve oyun sona erer.

### 3.5. Kullanıcı Arayüzü (UI)
- **Sade Arayüz:** Oyun başladığında ekranda menü, ayarlar veya ses düğmeleri gibi dikkat dağıtıcı hiçbir unsur olmayacaktır. Sadece oyun alanı ve skor bilgisi görünecektir.
- **Skor Göstergesi:** Oyuncunun mevcut puanı, ekranın bir köşesinde net bir şekilde gösterilecektir.
- **Rekor Tablosu:** Oyun sona erdiğinde, oyuncunun ulaştığı skor ve en yüksek skoru (`High Score`) gösteren basit bir ekran belirecektir. Bu tablo, tarayıcının yerel depolama (`localStorage`) alanında saklanacaktır.

## 4. Teknik Gereksinimler

- **Platform:** Web Tarayıcısı (Chrome, Firefox, Safari, Edge gibi modern tarayıcılarla uyumlu).
- **Teknoloji Stack'i:**
    - **HTML5:** Oyunun temel yapısı için.
    - **CSS3:** Arayüz ve oyun alanının stilizasyonu için.
    - **JavaScript (ES6+):** Tüm oyun mantığı, kontrol mekanikleri ve render işlemleri için.
    - **HTML5 Canvas:** Oyunun görselleştirilmesi, yılanın ve yiyeceklerin çizimi için kullanılacaktır.
