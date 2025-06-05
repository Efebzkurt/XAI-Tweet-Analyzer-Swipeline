# XAI-Tweet Analyzer

XAI, kullanıcıdan aldığı twitlerin kullanıcı adı, içerik, tarih ve saat verilerini ortaya koyup tweet içeriği ve duygusunu analiz eden bir yapay zeka uygulamasıdır.
## Analiz Sonucu
<img src="https://github.com/user-attachments/assets/55ffcacf-487b-4e13-8e0e-603a81768d15" height="300">


## Google Sheets
Bu sonuçlar, Google Sheets'e kaydedilir:
<img src="https://github.com/user-attachments/assets/f63201d7-5d5c-4e3e-bc87-68cd36671b8a" height="50">


## KURULUM
Başlatmadan önce, bağımlılıklar yüklenmeli
```
cd backend
npm install
cd ../frontend
npm install
```

credentials.json dosyası indirilip bu isimle backend klasörüne eklenmeli

Backend klasöründe .env dosyası oluşturulup gerekli keyler doldurulmalı
```
GOOGLE_GEMINI_API_KEY=XXXXXXXXXXX
TWITTER_BEARER_TOKEN=XXXXXXXXXX
GOOGLE_APPLICATION_CREDENTIALS=credentials.json
SHEET_ID=XXXXXXXXX
```

## ÇALIŞTIRMA
```
....XAI-Tweet-Analyzer/backend
node index
....XAI-Tweet-Analyzer/backend
npm start
```


## Mock veri yerine gerçek veri kullan
Mock veri yerine gerçek veri kullanmak için bu değeri "false" ile değiştir

```
....XAI-Tweet-Analyzer/backend/services/twitterService.js
const USE_MOCK_TWEET_DATA = true; <-----------------
```
