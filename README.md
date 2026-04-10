# 🪨📄✂️ Rock Paper Scissors - Next.js PWA

A modern and enhanced version of the classic Rock Paper Scissors game built with Next.js 16, TypeScript, Tailwind CSS, Framer Motion, and Serwist 9.5.0 for full PWA functionality.

Inspired by the classic version created by supersimpledev: https://supersimple.dev/projects/rock-paper-scissors/

**Demo:** [ppt.stackbp.es](https://example.stackbp.es/)

## ✨ PWA Features

### 📱 Installable
- **Installable app**: Available on iOS, Android, and desktop as a native app
- **Service Worker**: Works offline after first visit
- **Complete manifest**: Full configuration with icons, colors, and metadata

### 🎮 Game Features
- **Classic game**: Rock Paper Scissors with enhanced logic
- **Auto Play**: Automatic mode to watch the game in action
- **Keyboard shortcuts**: Press `R`, `P`, or `S` to play quickly
- **Persistence**: Your score is automatically saved in the browser

### 🏆 Achievement System
- **24 unique achievements** across 5 categories
- **Streak achievements**: Win 5, 10, 15, 20 games in a row
- **Victory milestones**: 10, 25, 50, 100, 200 total wins
- **Game count milestones**: 1, 10, 50, 100 games played
- **Move-specific achievements**: Master each move type
- **Special achievements**: Time-based, performance-based, and rare challenges
- **Rarity tiers**: Common, Rare, Epic, Legendary
- **Progress tracking**: All achievements saved to localStorage
- **Unlock notifications**: Animated popups when achievements are unlocked
- **Achievements gallery**: View all unlocked achievements with details

### 🎨 UI/UX
- **Modern design**: Clean and attractive interface with Tailwind CSS
- **Smooth animations**: Fluid transitions with Framer Motion
- **Responsive**: Optimized for mobile, tablet, and desktop
- **Visual feedback**: Colors and animations indicating the result

## 🛠️ Installation

```bash
npm install
```

## 🚀 Development

```bash
npm run dev
```

For development, use `npm run dev` which runs Next.js with webpack (required by Serwist).

Navigate to [http://localhost:3000](http://localhost:3000)

**Note:** The service worker does NOT work in dev mode. To test full PWA features, use production mode.

## 📦 Production

```bash
npm run build
npm start
```

Or to serve static files (FTP/Hostinger):

```bash
npm run build
```

Static files are generated in `out/`. Upload the contents of `out/` to your FTP.

## 🏆 Achievements

### Streak Achievements
| Achievement | Requirement | Rarity |
|-------------|-------------|--------|
| Maestro de Piedra | Win 5 games in a row | Common |
| Señor del Papel | Win 10 games in a row | Rare |
| Amo de las Tijeras | Win 15 games in a row | Epic |
| Trío Legendario | Win 20 games in a row | Legendary |

### Victory Milestones
| Achievement | Requirement | Rarity |
|-------------|-------------|--------|
| Primeros Pasos | 10 total wins | Common |
| Guerrero en Ascenso | 25 total wins | Common |
| Destructor de ilusiones | 50 total wins | Rare |
| Maestro de la Estrategia | 100 total wins | Epic |
| El Legendario | 200 total wins | Legendary |

### Move Mastery
| Achievement | Requirement | Rarity |
|-------------|-------------|--------|
| Devoto de la Piedra | Win 10 times with rock | Common |
| Devoto del Papel | Win 10 times with paper | Common |
| Devoto de las Tijeras | Win 10 times with scissors | Common |
| Sabio del Equilibrio | Win 5 times with each move | Rare |

### Special Achievements
| Achievement | Requirement | Rarity |
|-------------|-------------|--------|
| Sin Fracasos | 10 games without losing | Rare |
| Doble O Nada | Win immediately after losing | Common |
| Resurreccion | 3 wins in a row after losing | Epic |
| Abrazo Celestial | 3 ties in a row | Rare |
| Armonia Universal | 5 ties in a row | Epic |
| Búho Nocturno | Play between 2-5 AM | Rare |
| Alondra Madrugadora | Play before 7 AM | Rare |

## 🔧 PWA Configuration

### Service Worker (Serwist 9.5.0)
- **Offline-first**: Works without network after first visit
- **Cache strategies**:
  - Google Fonts: CacheFirst (1 year)
  - Images: CacheFirst (30 days)
  - Assets: CacheFirst (1 year, hashed)

### PWA Components
- `app/components/ServiceWorkerRegister.tsx`: Registers the SW
- `app/components/UpdateNotification.tsx`: New version notification
- `app/components/InstallPrompt.tsx`: Install button + iOS instructions
- `components/AchievementNotification.tsx`: Achievement unlock popup
- `components/AchievementsDisplay.tsx`: Achievements gallery modal

## 📁 Project Structure

```
├── app/
│   ├── components/            # PWA components
│   │   ├── ServiceWorkerRegister.tsx
│   │   ├── UpdateNotification.tsx
│   │   └── InstallPrompt.tsx
│   ├── layout.tsx             # Main layout + PWA
│   ├── page.tsx               # Main page
│   ├── globals.css            # Global styles
│   └── sw.ts                  # Service Worker (Serwist)
├── components/                # Game components
│   ├── Game.tsx
│   ├── MoveButton.tsx
│   ├── ResultDisplay.tsx
│   ├── ScoreDisplay.tsx
│   ├── GameControls.tsx
│   ├── AchievementNotification.tsx
│   └── AchievementsDisplay.tsx
├── data/
│   └── achievements.ts        # Achievement definitions
├── hooks/
│   └── useGame.ts             # Game logic
├── types/
│   └── game.ts                # TypeScript definitions
└── public/
    ├── manifest.json          # PWA manifest
    └── icons/                 # App icons
        ├── icon.svg
        └── icon-*.png         # Generated PNG icons (72-512px)
```

## 🧪 Testing PWA

To test PWA features:

1. **Local production**: `npm run build && npm start`
2. **Offline**: Disconnect network, open app - still works
3. **Installation**: "Instalar App" button in bottom left corner
4. **Updates**: Deploy new version, open installed app, notification appears
5. **Achievements**: Play games and unlock achievements

Service Workers require HTTPS (or localhost).

## 📝 License

Open source for personal and educational use.

---

Enjoy playing! 🎮
