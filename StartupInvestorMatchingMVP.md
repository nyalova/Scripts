# Startup-Investor Matching MVP

## Ürünün Çekirdeği

Fon arayan startup'lar ve yatırım yapmak isteyen kişiler tek bir yerde bulunur. Kullanıcılar ilanları keşfeder, filtreler ve doğrudan mesajlaşır.

**Kapsamda olan (MVP):**

1. Startup onboarding / profil oluşturma
2. Investor onboarding / profil oluşturma
3. Startupların investorları keşfetmesi
4. Investorların startupları keşfetmesi
5. Basit filtreleme
6. Profil/detay görüntüleme
7. Herkesin herkese doğrudan mesaj gönderebilmesi
8. Basit mesajlaşma
9. Kendi profilini düzenleme

**Kapsamda olmayan:** Matching, connection request, like, meeting, calendar, feed, follow, AI, pitch deck, payment, subscription, karmaşık bildirimler, yatırım transaction'ı, karmaşık startup/investor profilleri.

## 0. Onboarding / Rol Seçimi

Uygulamaya ilk giren kullanıcı önce rolünü seçer:

```
Sen kimsin?

[ Startup'ım ]

[ Investor'ım ]
```

Seçime göre kullanıcı ilgili profil oluşturma ekranına yönlendirilir:

- **Startup** → Bölüm 5'teki "Startup Oluşturma" formu
- **Investor** → Bölüm 6'daki "Investor Profili" formu

Rol, kullanıcı hesabına kayıt anında bir kere atanır ve Keşfet ekranının davranışını (Bölüm 7) belirler.

## 1. Ana Menü

Sadece 3 menü yeterli:

- **🏠 Keşfet** — Startup'ları keşfet.
- **💬 Mesajlar** — Gönderdiğin ve aldığın mesajlar.
- **👤 Profil** — Kendi startup profilin.

Eğer kullanıcı startup değil de yatırımcıysa Profil yine aynı mantıkta çalışır.

Başka menü yok.

## 2. Keşfet

Uygulamanın ana ekranı.

Üstte:

```
Startup'ları Keşfet

[ Filtrele ]
```

Ayrı bir arama motoru MVP kapsamında yok; keşif sadece filtreleme ile yapılır.

Altında startup ilanları. Örneğin:

```
┌──────────────────────────────┐
  ACME AI

  Yapay zeka destekli
  satış otomasyonu geliştiriyoruz.

  AI & SaaS

  $500K arıyoruz

  [ Mesaj Gönder ]
└──────────────────────────────┘
```

Buradaki kritik nokta: kartın kendisi yeterince bilgi vermeli. Kullanıcı her ilana girip çıkmak zorunda kalmamalı.

## 3. Filtre

Filtreyi de sadece gerçekten işe yarayan şeylerden oluşturuyoruz.

### Sektör

Single/multi seçim olabilir:

```
☐ AI
☐ SaaS
☐ Fintech
☐ E-commerce
☐ Healthtech
☐ Energy
☐ Other
```

### Yatırım Miktarı

Single choice scale:

```
○ $0–50K
○ $50K–100K
○ $100K–250K
○ $250K–500K
○ $500K–1M
○ $1M+
```

### Aşama

3. soruda bu belirtilmediği için MVP'de koymazdım. Sadece kullanıcıların gerçekten keşif davranışını etkiliyorsa sonradan eklenebilir.

## 4. Startup Detay Sayfası

Karttan tıklayınca:

```
←

ACME AI

AI & SaaS

$500K arıyoruz

────────────────

Ne yapıyoruz?

Yapay zeka destekli satış
otomasyonu geliştiriyoruz...

────────────────

[ Mesaj Gönder ]
```

Bitti.

Startup'a şu alanları MVP'de zorunlu tutmazdım (isterse açıklamanın içine koyabilir):

- Kurucu bilgisi
- Ekip
- Finansallar
- Pitch deck
- Cap table
- Website
- Traction
- Revenue

**Boş durum:** Keşfet ekranında filtreye uyan hiç ilan yoksa "Bu kriterlere uygun ilan bulunamadı" mesajı gösterilir.

## 5. Startup Oluşturma

"Profil" yerine startup tarafında esasen ilan oluşturuyorsun.

```
Startup'ını oluştur

İşletmenin adı
[____________]

Ne yapıyorsunuz?
[____________]

Ne kadar yatırım arıyorsunuz?

○ $0–50K
○ $50K–100K
○ $100K–250K
○ $250K–500K
○ $500K–1M
○ $1M+

Sektör

○ AI
○ SaaS
○ Fintech
...

[ Yayınla ]
```

Bu kadar. Kullanıcı 2 dakika içinde ilanını yayınlayabilmeli.

Yayınladıktan sonra Profil sekmesinde kendi ilanını görüntüler ve `[ Düzenle ]` ile aynı formu (isim, açıklama, tutar, sektör) tekrar açıp güncelleyebilir — Investor tarafındaki (Bölüm 6) düzenleme akışıyla simetrik.

## 6. Investor Tarafı

Burada önemli bir UX kararı var. Investor için "profil" oluşturuyoruz:

```
Ahmet Yılmaz

Investor

Yatırım miktarım

○ $0–50K
○ $50K–100K
○ $100K–250K
○ $250K–500K
○ $500K–1M
○ $1M+

Hakkımda

Fintech ve SaaS şirketlerine
yatırım yapmakla ilgileniyorum.

[ Düzenle ]
```

Investor'ın ayrıca ilan oluşturmasına gerek yok.

## 7. Investor Ne Görüyor?

Investor uygulamaya girdiğinde: Keşfet → Startup'lar görüyor.

Startup ise: Keşfet → Investor'lar görüyor.

Ama burada kullanıcı rolüne göre davranışı değiştiriyoruz.

- **Startup**: Startup'ları görmez, Investor'ları görür.
- **Investor**: Startup'ları görür.

Yani:

```
INVESTOR
   ↓
Keşfet
   ↓
Startup listesi
   ↓
Startup detay
   ↓
Mesaj
```

ve:

```
STARTUP
   ↓
Keşfet
   ↓
Investor listesi
   ↓
Investor detay
   ↓
Mesaj
```

## 8. Investor Keşfet Ekranı

Startup'ın karşısına:

```
Yatırımcıları Keşfet

[ Filtrele ]

────────────────

Ahmet Yılmaz

Investor

$100K – $500K

AI · SaaS · Fintech

"Erken aşama teknoloji
şirketleriyle ilgileniyorum."

[ Mesaj Gönder ]

────────────────

XYZ Capital

Investor

$500K – $1M

SaaS · Fintech

...
```

Filtre kriterleri, Bölüm 3'teki ile simetriktir: sektör ilgisi ve yatırım miktarı (investor'ın "yatırım miktarım" alanına göre).

Burada da connection/match yok. Direkt: Mesaj Gönder.

## 9. Mesaj Sistemi

Burası ürünün ikinci ana özelliği. Bir kullanıcı herhangi bir ilana/profile girer:

```
Mesaj Gönder
   ↓

Mesaj Gönder

Ahmet Yılmaz'a mesajınız

[________________________]

                         [Gönder]
```

Sonra konuşma Mesajlar bölümüne düşer.

## 10. Mesajlar

WhatsApp kadar basit.

```
Mesajlar

Ahmet Yılmaz
Merhaba, startup'ınızla ilgileniyorum...

2 dk

ABC Startup
Merhaba, yatırım fırsatımız hakkında...

1 sa
```

Chat ekranı:

```
← Ahmet Yılmaz

Merhaba, startup'ınızı
incelemek isterim.

      Tabii, size detayları
      gönderebilirim.

[ Mesaj yaz................ ] ➤
```

Başka hiçbir şey yok.

**Boş durum:** Hiç mesajı olmayan kullanıcı için Mesajlar sekmesinde "Henüz mesajın yok" mesajı gösterilir.

> Not: Ürünün uzun vadeli positioning'i ("fon arayanlarla yatırım yapmak isteyenlerin ortak network'ü", arz/talep sayaçları vb.) bir vizyon notudur — MVP ekran listesinin bir parçası değildir ve bu dokümanın kapsamı dışındadır.

## 11. MVP'nin Tamamı

Gerçekten sadece şuna indiriyoruz:

```
              ROL SEÇİMİ
                  │
          ┌───────┴───────┐
          │               │
       STARTUP         INVESTOR
     (profil oluştur) (profil oluştur)
          │               │
          └───────┬───────┘
                  │
                 APP
                  │
        ┌─────────┼─────────┐
        │         │         │
     KEŞFET     MESAJLAR   PROFİL
        │                     │
    ┌───┴────┐             GÖRÜNTÜLE
    │        │                │
 STARTUP   INVESTOR        DÜZENLE
    │        │
    └───┬────┘
        │
     DETAY
        │
   MESAJ GÖNDER
        │
     MESAJLAR
```

**Startup tarafı**: Rol seç → Profil oluştur/yayınla → Investor keşfet → Filtrele → Detay → Mesaj gönder/al → Profil sekmesinden düzenle

**Investor tarafı**: Rol seç → Profil oluştur → Startup keşfet → Filtrele → Detay → Mesaj gönder/al → Profil sekmesinden düzenle
