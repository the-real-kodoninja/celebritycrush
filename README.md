# CelebrityCrush 🌟

Welcome to **CelebrityCrush**, the ultimate social platform to obsess over your favorite stars—Billie Eilish, Zendaya, Lynette Adkins, and beyond! We scrape the web for *everything*—photos, videos, news, gossip, NFTs, dating dirt—all sourced from the wild internet, nothing stored here. Crush hard, rank your faves, mint NFTs, and trade fan-made merch in a minimalist, addictively sleek UI.

## Features 🔥

- **Web-Scraped Profiles**: Bios, pics, socials, news—pulled live from Wikipedia, TMZ, IMDb, and more.
- **Crush Levels**: Rate your faves 1-100.
- **NFT Marketplace**: Mint and trade fan-made celebrity NFTs (powered by Motoko on Internet Computer).
- **Fan Merch**: Sell art, clothes, and gear (royalty-free fan creations).
- **Social Vibes**: Post, like, comment, share—minimalist and modern.
- **Face Cards**: Quick celebrity previews with follow buttons.

## Tech Stack 💻

- **Frontend**: React, TypeScript, Emotion (CSS-in-JS).
- **Backend**: Ruby on Rails (API), Python (scraper), Motoko (NFTs).
- **Database**: PostgreSQL.
- **Repo**: [github.com/the-real-kodoninja/celebritycrush](https://github.com/the-real-kodoninja/celebritycrush).

## Getting Started 🚀

### Prerequisites

- Ruby 3.x, Rails 8.x
- Python 3.x
- Node.js, npm
- PostgreSQL
- Git

### Setup

1.  **Clone the Repo**:

    ```bash
    git clone [https://github.com/the-real-kodoninja/celebritycrush.git](https://github.com/the-real-kodoninja/celebritycrush.git)
    cd celebritycrush
    ```

2.  **Backend:**

    ```bash
    cd backend
    bundle install
    nano config/database.yml  # Update with your PostgreSQL creds
    rails db:create db:migrate
    mkdir python
    cd python
    python3 -m venv venv
    source venv/bin/activate
    pip install requests beautifulsoup4
    cp ../../backend/python/scraper.py .  # Copy from repo if needed
    python3 scraper.py
    cd ..
    rails db:seed
    rails s
    ```

3.  **Frontend:**

    ```bash
    cd ../frontend
    npm install
    npm start  # Runs at http://localhost:3001
    ```

**Visit:**

- Backend API: http://localhost:3000/api/celebrities
- Frontend: http://localhost:3001

## To-Do 🎯

- Design Overhaul: Ditch the “awful” purple-pink for a sleek, engaging palette.
- Expand Scraper: More celebs, richer data (videos, gossip, stats).
- Add Features: User accounts, NFT minting, marketplace UI.
- Polish UI: Face cards, search dropdown, responsive layout.

## Contribute 🤝

Fork it, tweak it, PR it—let’s make CelebrityCrush the hottest spot for fanatics! Issues? Ideas? Hit us up on GitHub.

Crush it! 🌟