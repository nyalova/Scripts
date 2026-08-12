# Startup-Investor Matching MVP

## Ürünün Çekirdeği

Fon arayan startup'lar ve yatırım yapmak isteyen kişiler tek bir yerde bulunur. Kullanıcılar ilanları keşfeder, filtreler ve doğrudan mesajlaşır.

**Connection yok. Match yok. Meeting yok. Payment yok.**

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

[ 🔍 Ara ]

[ Filtrele ]
```

Altında startup ilanları. Örneğin:

```
┌──────────────────────────────┐
  ACME AI

  Yapay zeka destekli
  satış otomasyonu geliştiriyoruz.

  AI & SaaS

  Seed

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

Seed

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

[ 🔍 Ara ]

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

## 11. Network Effect'i Ürünün Merkezine Koyuyoruz

Bu ürün positioning'ini belirliyor. Bu "Startup bulma uygulaması" değil.

Bu: **"Türkiye'de fon arayanlarla yatırım yapmak isteyenlerin ortak network'ü."**

Dolayısıyla ürünün ana ekranında mümkün olduğunca çok arz + talep görünmeli.

İleride:

```
1,240 Startup
   +
680 Investors
   ↓
Tek network
```

gibi bir network algısı yaratabiliriz. Ama MVP'de bunu bile göstermek zorunda değiliz.

## 12. MVP'nin Tamamı

Gerçekten sadece şuna indiriyoruz:

```
                 APP
                  │
        ┌─────────┼─────────┐
        │         │         │
     KEŞFET     MESAJLAR   PROFİL
        │
    ┌───┴────┐
    │        │
 STARTUP   INVESTOR
    │        │
    └───┬────┘
        │
     DETAY
        │
   MESAJ GÖNDER
        │
     MESAJLAR
```

**Startup tarafı**: Oluştur → Yayınla → Investor keşfet → Mesaj gönder/al

**Investor tarafı**: Profil oluştur → Startup keşfet → Mesaj gönder/al
