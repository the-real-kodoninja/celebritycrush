import requests
from bs4 import BeautifulSoup
import json
from urllib.parse import quote

SOURCES = {
    "wiki": "https://en.wikipedia.org/wiki/",
    "tmz": "https://www.tmz.com/search/",
    "imdb": "https://www.imdb.com/find?q=",
    "ethnic_celebs": "https://ethnicelebs.com/?s=",
    "social_twitter": "https://twitter.com/search?q=",
    "social_insta": "https://www.instagram.com/explore/tags/"
}

CELEBRITIES = ["Billie Eilish", "Zendaya", "Lynette Adkins"]

def scrape_celebrity(name):
    data = {"name": name, "sources": {}}

    wiki_url = f"{SOURCES['wiki']}{quote(name.replace(' ', '_'))}"
    try:
        resp = requests.get(wiki_url)
        soup = BeautifulSoup(resp.text, 'html.parser')
        bio = soup.find('p', class_=None).text if soup.find('p') else ""
        img = soup.find('img', class_='mw-file-element', alt=lambda x: x and name in x)  # Target actual celeb image
        img_url = f"https:{img['src']}" if img else "https://via.placeholder.com/100"
        data["sources"]["wiki"] = {"bio": bio, "photo_url": img_url, "url": wiki_url}
    except Exception as e:
        print(f"Wiki error for {name}: {e}")
        data["sources"]["wiki"] = {"bio": "", "photo_url": "https://via.placeholder.com/100", "url": wiki_url}

    tmz_url = f"{SOURCES['tmz']}{quote(name)}"
    try:
        resp = requests.get(tmz_url)
        soup = BeautifulSoup(resp.text, 'html.parser')
        news = [{"title": a.text, "url": a['href']} for a in soup.select('.search-result__title a')[:3]]
        data["sources"]["tmz"] = {"news": news, "url": tmz_url}
    except Exception as e:
        print(f"TMZ error for {name}: {e}")

    imdb_url = f"{SOURCES['imdb']}{quote(name)}"
    try:
        resp = requests.get(imdb_url)
        soup = BeautifulSoup(resp.text, 'html.parser')
        bio_link = soup.find('a', class_='ipc-metadata-list-summary-item__t')
        bio_url = f"https://www.imdb.com{bio_link['href']}" if bio_link else imdb_url
        data["sources"]["imdb"] = {"url": bio_url}
    except Exception as e:
        print(f"IMDb error for {name}: {e}")

    ethnic_url = f"{SOURCES['ethnic_celebs']}{quote(name)}"
    try:
        resp = requests.get(ethnic_url)
        soup = BeautifulSoup(resp.text, 'html.parser')
        race = soup.find('div', class_='entry-content') or ""
        data["sources"]["ethnic_celebs"] = {"race": race.text.strip() if race else "", "url": ethnic_url}
    except Exception as e:
        print(f"Ethnic Celebs error for {name}: {e}")

    twitter_url = f"{SOURCES['social_twitter']}{quote(name)}"
    insta_url = f"{SOURCES['social_insta']}{quote(name.replace(' ', ''))}"
    data["sources"]["social"] = {
        "twitter": {"url": twitter_url},
        "instagram": {"url": insta_url}
    }

    data["sources"]["misc"] = {
        "nft": {"url": f"https://opensea.io/search?query={quote(name)}"},
        "dating": {"url": f"https://www.whosdatedwho.com/search?q={quote(name)}"},
        "nsfw": {"url": ""}
    }

    return data

all_celebs = [scrape_celebrity(name) for name in CELEBRITIES]
with open('celebrities.json', 'w') as f:
    json.dump(all_celebs, f, indent=2)

print("Scraping complete!")