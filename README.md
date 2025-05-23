# Feraset Case 

## Özellikler

- Metin promptları ile logo tasarımı oluşturma
- Dört farklı logo stili seçeneği (No Style, Monogram, Mascot, Abstract)
- Firebase Storage entegrasyonu ile görsel yönetimi (Eğer görseller bulunamazsa local görseller kullanılır)
- Firebase Firestore entegrasyonu ile kullanıcı promptlarını ve stil seçimlerini kaydetme
- Modern ve kullanıcı dostu arayüz
- Hata durumlarına karşı dayanıklılık

## Kurulum

### Kurulum

1. Projeyi klonlayın:
   ```
   git clone https://github.com/kursatalgul/ferasetcase
   cd ferasetcase
   ```

2. Bağımlılıkları yükleyin:
   ```
   npm install
   # veya
   yarn install
   ```

3. Uygulamayı başlatın:
   ```
   npm start
   # veya
   yarn start
   # veya
   expo start
   ```

## Kullanım

1. Uygulama başladığında, ana ekranda bir metin giriş alanı ve stil seçenekleri göreceksiniz
2. Logo için bir açıklama (prompt) girin
3. Dört stil seçeneğinden birini seçin
4. "Create" butonuna tıklayın
5. İşlem tamamlandığında "Ready" butonuna tıklayın
6. Oluşturulan logo tasarımını görüntüleyin

## Proje Yapısı

```
├── assets/             # Görsel ve diğer statik dosyalar
├── firebase/           # Firebase entegrasyonu
│   ├── config.js      # Firebase yapılandırması
│   ├── imageService.js # Görsel yükleme/indirme işlemleri
│   └── promptService.js # Kullanıcı promptlarını kaydetme
├── screens/           # Uygulama ekranları
│   ├── InputScreen.js  # Kullanıcı girdilerini alan ekran
│   └── OutputScreen.js # Oluşturulan tasarımı gösteren ekran
├── App.js             # Ana uygulama bileşeni ve navigasyon
└── package.json       # Proje bağımlılıkları
```

## Teknolojiler

- React Native (Expo)
- Firebase (Storage ve Firestore)
- React Navigation
- Expo bileşenleri (LinearGradient, StatusBar vb.)

