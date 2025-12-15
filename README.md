# Telemetri Dashboard (KR-App)

Bu proje, elektrikli araç telemetri verilerini izlemek, analiz etmek ve yönetmek için geliştirilmiş modern bir web uygulamasıdır. Mikro-frontend mimarisine benzer bir yapı kullanarak farklı teknolojileri (Next.js, .NET, Node.js, Python) tek bir çatı altında toplar.

![Project Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🚀 Proje Hakkında

Özellikler:
*   **Gerçek Zamanlı İzleme:** Araç hızı, batarya durumu (SOC), motor ve inverter sıcaklıkları gibi verilerin canlı takibi.
*   **Admin Paneli:** Yönetimsel işlemler için Node.js tabanlı alt modül.
*   **Mühendislik Hesaplamaları:** Python (Streamlit) tabanlı birim çevirici ve gerilme analizi araçları.
*   **Güvenli Kimlik Doğrulama:** .NET Core Identity ve JWT tabanlı güvenlik.

## 🛠 Teknolojiler

Proje monorepo yapısındadır ve aşağıdaki teknolojileri kullanır:

| Modül | Teknoloji | Port | Açıklama |
| :--- | :--- | :--- | :--- |
| **Web (Frontend)** | Next.js 14, TailwindCSS | `3000` | Ana kullanıcı arayüzü |
| **API (Backend)** | .NET 8, EF Core | `5000` | Ana veri servisi ve Auth |
| **Admin** | Node.js (Vanilla) | `3002` | Admin paneli micro-app |
| **Telemetry** | Node.js | `3003` | Telemetri veri simülasyonu |
| **Calculations** | Python (Streamlit) | `8501` | Hesaplama araçları |
| **Database** | PostgreSQL | `5432` | Veritabanı (Docker üzerinde) |

## ⚙️ Kurulum ve Çalıştırma

Projeyi yerel ortamda çalıştırmak için aşağıdaki adımları izleyin.

### Ön Gereksinimler
*   [Docker Desktop](https://www.docker.com/) (Veritabanı için)
*   [Node.js](https://nodejs.org/) (v18+)
*   [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
*   [Python](https://www.python.org/) (v3.10+)

### Adım 1: Veritabanını Başlatın
PostgreSQL veritabanını Docker üzerinde ayağa kaldırın:
```bash
docker-compose up -d postgres
```

### Adım 2: Backend'i Çalıştırın (.NET API)
```bash
cd apps/api
dotnet run --urls=http://localhost:5000
```

### Adım 3: Frontend'i Çalıştırın (Next.js)
```bash
cd apps/web
npm install  # İlk kurulumda
npm run dev
```

### Adım 4: Mikro Servisleri Çalıştırın
Diğer modüllerin (Admin, Telemetri, Hesaplamalar) çalışması için ayrı terminallerde şu komutları girin:

**Admin:**
```bash
cd apps/admin
node server.js
```

**Telemetri:**
```bash
cd apps/telemetry
node server.js
```

**Hesaplamalar (Python):**
```bash
cd apps/calculations
pip install -r requirements.txt
streamlit run main.py --server.port 8501
```

## 📂 Proje Yapısı

```
kr-app/
├── apps/
│   ├── api/            # .NET Core Backend
│   ├── web/            # Next.js Frontend
│   ├── admin/          # Node.js Admin Micro-app
│   ├── telemetry/      # Node.js Telemetry Service
│   └── calculations/   # Python Streamlit App
├── docker-compose.yml  # Docker servis tanımları
└── .gitignore          # Git ignore kuralları
```

## 🔒 Güvenlik Notu

Bu proje yerel geliştirme ortamı için yapılandırılmıştır. `appsettings.json` ve `.env` dosyalarındaki hassas verileri production ortamında kullanmayınız ve git geçmişine eklemeyiniz.
