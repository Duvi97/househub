# HouseHub (HH) MVP

Platformă demonstrativă care conectează arhitecți și persoane aflate în căutarea unui proiect de casă.

## Descriere proiect

HouseHub este o platformă web statică care facilitează conexiunea dintre arhitecți și clienți interesați de proiecte de case. Aplicația permite explorarea portofoliilor de proiecte, filtrarea după stiluri arhitecturale și contactarea directă a arhitecților.

## Structura proiectului

```
househub/
├── index.html          # Pagina principală HTML
├── app.js              # JavaScript pentru funcționalități client-side
├── styles.css          # Stiluri CSS pentru interfață
├── config.json         # Configurație aplicație (mod dezvoltare)
├── data/
│   ├── architects.json # Lista arhitecților
│   └── [Nume Arhitect]/
│       └── projects.json # Proiectele fiecărui arhitect
└── README.md           # Acest fișier
```

## Funcționalități

### Galerie proiecte
- Afișare proiecte în format card cu imagine, descriere și metadate
- Filtrare după arhitect și stil arhitectural
- Animații de reveal la încărcare

### Dialog detalii proiect
- Vizualizare detalii complete ale proiectului
- Formular contact direct către arhitect
- Informații despre locație, dimensiune, buget

### Formulare înregistrare
- Formular pentru arhitecți interesați să se înscrie
- Formular pentru clienți interesați să solicite proiecte
- Validare și feedback în frontend (demo)

### Mod dezvoltare
- Pagină "Site în dezvoltare" când aplicația este în mentenanță
- Configurabilă prin fișierul `config.json`

## Configurare mod dezvoltare

Pentru a activa pagina de "Site în dezvoltare":

1. Deschide `config.json`
2. Setează `"underDevelopment": true`
3. Reîncarcă pagina în browser

Când este activat, site-ul va afișa un mesaj de mentenanță în loc de conținutul normal.

```json
{
  "underDevelopment": true
}
```

## Rulare locală

Aplicația este complet statică și nu necesită server backend.

### Opțiunea 1: Deschidere directă
- Deschide `index.html` direct în browser

### Opțiunea 2: Server local (recomandat)
```bash
# Navighează în folderul proiectului
cd househub

# Rulează server HTTP simplu
python3 -m http.server 8080
```

Apoi deschide `http://localhost:8080` în browser.

## Personalizare date

### Adăugare proiecte noi

1. **Adaugă arhitect nou în `data/architects.json`:**
```json
["Aria Studio", "Nexa Atelier", "Raluca Duval", "Nume Arhitect Nou"]
```

2. **Creează folder pentru arhitect:**
```
data/Nume Arhitect Nou/
```

3. **Creează `projects.json` în folderul arhitectului:**
```json
[
  {
    "id": 1,
    "name": "Nume Proiect",
    "style": "Stil Arhitectural",
    "location": "Locație",
    "size": "Dimensiune",
    "budget": "Buget",
    "architect": "Nume Arhitect",
    "email": "email@arhitect.ro",
    "summary": "Descriere scurtă",
    "image": "URL imagine"
  }
]
```

### Stiluri arhitecturale suportate
- Modern
- Minimalist
- Mediteranean
- Rustic
- Industrial
- Contemporary

## Personalizare branding

### Logo și marcă
- Înlocuiește `image.png` cu logo-ul final
- Actualizează textul în `index.html` în elementul `.brand`

### Culori
Modifică variabilele CSS în `styles.css` în secțiunea `:root`:

```css
:root {
  --bg: #f3efe8;           /* Fundal principal */
  --surface: #fffdf8;      /* Suprafețe componente */
  --primary: #bf4d28;      /* Culoare accent principală */
  --accent: #1f4b45;       /* Culoare accent secundară */
  /* ... alte variabile */
}
```

### Fonturi
Aplicația folosește Google Fonts (Manrope și Space Grotesk). Modifică în `index.html` pentru alte fonturi.

## Tehnologii folosite

- **HTML5**: Structură semantică
- **CSS3**: Stilizare responsive cu variabile CSS
- **Vanilla JavaScript**: Funcționalități interactive fără framework-uri
- **Fetch API**: Încărcare date JSON
- **CSS Grid/Flexbox**: Layout responsive

## Limitări MVP

- **Fără backend**: Formularele sunt demo (afișează doar mesaje de succes/eroare)
- **Date statice**: Proiectele sunt stocate în fișiere JSON locale
- **Fără autentificare**: Nu există conturi utilizator
- **Fără căutare avansată**: Doar filtre simple

## Evoluție viitoare

- Conectare la API backend pentru persistență date
- Sistem de autentificare și conturi utilizator
- Funcționalități marketplace (plăți, contracte)
- Sistem de rating și recenzii
- Căutare avansată și filtre complexe
- Integrare cu servicii externe (Unsplash pentru imagini)

## Licență

Acest proiect este demonstrativ și poate fi folosit ca bază pentru dezvoltarea unei platforme reale.

## Contact

Pentru întrebări sau colaborări: contact@househub.ro
