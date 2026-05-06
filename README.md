# 🌍 [Planetary Exploration](https://raghugg.github.io/planetary-exploration-multiplayer)

🔗 https://raghugg.github.io/planetary-exploration-multiplayer

A browser-based incremental clicker game built for CS321 at George Mason University. Destroy planets, unlock new worlds, and build an unstoppable destruction empire.

## 🎮 Gameplay

Click the planet to deal damage and accumulate destruction points. Spend points in the shop to automate destruction and upgrade your click power. Once you've dealt enough damage, progress to the next planet — each one stranger than the last.

**Planets:**
| Planet | Threshold |
|--------|-----------|
| Earth | Starting planet |
| GloobGlorb | 50,000 points |
| BlingoScrunge | 100,000 points |
| Black Hole | 1,000,000 points |

## 🛒 Shop Items

| Item | Base Price | Points/sec |
|------|-----------|------------|
| Throw Meteors | 15 | 1 |
| Cut Trees | 100 | 4 |
| Damage The Ozone | 1,100 | 16 |
| Dump Litter | 12,000 | 64 |
| Throw Plastic Straws Into The Ocean | 130,000 | 275 |

Click power can also be upgraded up to 4 tiers (1 → 2 → 4 → 8 points per click).

## 🔧 Features

- Persistent game state via `localStorage` — progress is saved between sessions
- Auto-generation of points from purchased shop items (updates every 100ms)
- Planet health visual system — planet image degrades as you approach the destruction threshold
- Clicks-per-second (CPS) tracker
- Background music with volume slider and mute toggle
- Tutorial overlay on first visit
- Full game reset and item-only reset options
- Global leaderboard — submit and view top scores powered by a REST API

## 🛠 Stack

- **Frontend:** TypeScript, HTML, CSS — deployed via GitHub Pages
- **Backend:** Node.js, Express — deployed on AWS EC2
- **Database:** PostgreSQL
- **CI/CD:** GitHub Actions — compiles TypeScript and deploys frontend and backend on push

## 🚀 Running Locally

**Frontend:**
```bash
git clone https://github.com/raghugg/planetary-exploration-multiplayer
cd planetary-exploration-multiplayer
open index.html
```

**Backend:**
```bash
cd backend
npm install
DB_PASSWORD=<your_postgres_password> node server.js
```

## 👥 Authors

- Raghavendra Guggilam
- Emily Nguyen
- Sean Taylor
- Sean Tran
