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

## 🚀 Running Locally

No build tools required — just open `index.html` in your browser.

```bash
git clone https://github.com/raghugg/earth-destroyer
cd earth-destroyer
open index.html
```

## 👥 Authors

- Raghavendra Guggilam
- Emily Nguyen
- Sean Taylor
- Sean Tran
