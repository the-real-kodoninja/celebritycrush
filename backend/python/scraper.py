import requests
from bs4 import BeautifulSoup
import json
from urllib.parse import quote
import psycopg2
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
from serpapi import GoogleSearch
import os

# Database connection
def get_db_connection():
    return psycopg2.connect(
        dbname="celebritycrush_development",
        user="kodoninja",
        password="",
        host="localhost",
        port="5432"
    )

# Fetch celebrity names from the database
def get_celebrities_from_db():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT name FROM scraped_celebrities")
    celebrities = [row[0] for row in cur.fetchall()]
    cur.close()
    conn.close()
    return celebrities

# Update scraped_at timestamp after scraping
def update_scraped_at(name):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "UPDATE scraped_celebrities SET scraped_at = %s WHERE name = %s",
        (datetime.now(), name)
    )
    conn.commit()
    cur.close()
    conn.close()

# Selenium setup for dynamic scraping
def setup_selenium():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(options=chrome_options)
    return driver

# Google search for missing info or images
def google_search(query, api_key=None):
    if not api_key:
        api_key = os.getenv("SERPAPI_KEY", "950e5c5723afa42ff4f79441120e944aad1807c4de08d1112e8bf7ff63f7f9ad")  # Set your SerpApi key in environment variables
    params = {
        "q": query,
        "api_key": api_key
    }
    search = GoogleSearch(params)
    results = search.get_dict()
    return results

SOURCES = {
    "wiki": "https://en.wikipedia.org/wiki/",
    "tmz": "https://www.tmz.com/search/",
    "imdb": "https://www.imdb.com/find?q=",
    "ethnic_celebs": "https://ethnicelebs.com/?s=",
    "social_twitter": "https://twitter.com/search?q=",
    "social_insta": "https://www.instagram.com/explore/tags/",
    "social_youtube": "https://www.youtube.com/results?search_query=",
    "social_tiktok": "https://www.tiktok.com/search/user?q=",
    "social_facebook": "https://www.facebook.com/search/top/?q=",
    "social_threads": "https://www.threads.net/search/?q=",
    "social_mastodon": "https://mastodon.social/explore/search?q=",
    "social_bluesky": "https://bsky.app/search?q="
}

# Scrape social media for influencers with over 300,000 followers
def scrape_social_media_influencers():
    platforms = ["social_youtube", "social_tiktok", "social_insta", "social_twitter", "social_facebook", "social_threads", "social_mastodon", "social_bluesky"]
    influencers = set()
    driver = setup_selenium()

    for platform in platforms:
        print(f"Scraping {platform} for influencers...")
        try:
            base_url = SOURCES[platform]
            # Example: Search for popular users (this is a simplified approach; real-world scraping may need API access)
            driver.get(base_url + quote("influencer"))
            time.sleep(3)  # Wait for page to load

            if platform == "social_youtube":
                elements = driver.find_elements(By.XPATH, "//ytd-channel-renderer")
                for elem in elements:
                    name = elem.find_element(By.XPATH, ".//yt-formatted-string[@id='channel-title']").text
                    subs = elem.find_element(By.XPATH, ".//span[@id='subscribers']").text
                    if "K" in subs or "M" in subs:
                        num = float(subs.replace("K", "").replace("M", "").replace(" subscribers", ""))
                        if "M" in subs and num >= 0.3:
                            influencers.add(name)
                        elif "K" in subs and num >= 300:
                            influencers.add(name)

            elif platform == "social_tiktok":
                elements = driver.find_elements(By.XPATH, "//div[@class='tiktok-1soki6-DivUserCardContainer']")
                for elem in elements:
                    name = elem.find_element(By.XPATH, ".//p[@class='tiktok-1n8dzo-PUserName']").text
                    followers = elem.find_element(By.XPATH, ".//p[@class='tiktok-1n8dzo-PUserStats']").text
                    if "followers" in followers and ("K" in followers or "M" in followers):
                        num = float(followers.split(" ")[0].replace("K", "").replace("M", ""))
                        if "M" in followers and num >= 0.3:
                            influencers.add(name)
                        elif "K" in followers and num >= 300:
                            influencers.add(name)

            # Add similar logic for other platforms (simplified here due to complexity)
            # In a real scenario, use APIs or more robust scraping methods
        except Exception as e:
            print(f"Error scraping {platform}: {e}")
        time.sleep(1)  # Avoid rate limiting

    driver.quit()
    return list(influencers)

# Add business tycoons
def get_business_tycoons():
    return [
        "Elon Musk",
        "Mark Zuckerberg",
        "Jeff Bezos",
        "Bill Gates",
        "Warren Buffett",
        "Larry Ellison",
        "Mukesh Ambani",
        "Gautam Adani"
    ]

def scrape_celebrity(name):
    data = {"name": name, "sources": {}}
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

    # Wikipedia scrape
    wiki_url = f"{SOURCES['wiki']}{quote(name.replace(' ', '_'))}"
    try:
        resp = requests.get(wiki_url, headers=headers)
        soup = BeautifulSoup(resp.text, 'html.parser')
        bio = soup.find('p', class_=None).text if soup.find('p') else ""
        img = soup.find('table', class_='infobox')
        img = img.find('img') if img else None
        img_url = f"https:{img['src']}" if img and 'src' in img.attrs and 'lock' not in img['src'] else None
        data["sources"]["wiki"] = {"bio": bio, "photo_url": img_url, "url": wiki_url}
    except Exception as e:
        print(f"Wiki error for {name}: {e}")
        data["sources"]["wiki"] = {"bio": "", "photo_url": None, "url": wiki_url}

    # If no bio or image, search the web
    if not data["sources"]["wiki"]["bio"] or not data["sources"]["wiki"]["photo_url"]:
        print(f"Searching web for {name}...")
        results = google_search(f"{name} biography OR profile site:*.edu OR site:*.org OR site:*.gov -inurl:(signup OR login)")
        if "organic_results" in results:
            for result in results["organic_results"]:
                if not data["sources"]["wiki"]["bio"]:
                    try:
                        resp = requests.get(result["link"], headers=headers)
                        soup = BeautifulSoup(resp.text, 'html.parser')
                        paragraphs = soup.find_all('p')
                        bio = " ".join(p.text for p in paragraphs[:3] if p.text.strip())
                        if bio:
                            data["sources"]["wiki"]["bio"] = bio
                            data["sources"]["wiki"]["url"] = result["link"]
                            break
                    except:
                        continue

        if not data["sources"]["wiki"]["photo_url"]:
            img_results = google_search(f"{name} profile picture")
            if "images_results" in img_results:
                for img in img_results["images_results"]:
                    if "thumbnail" in img:
                        data["sources"]["wiki"]["photo_url"] = img["thumbnail"]
                        break
            if not data["sources"]["wiki"]["photo_url"]:
                data["sources"]["wiki"]["photo_url"] = "https://via.placeholder.com/100"

    # TMZ scrape
    tmz_url = f"{SOURCES['tmz']}{quote(name)}"
    try:
        resp = requests.get(tmz_url, headers=headers)
        soup = BeautifulSoup(resp.text, 'html.parser')
        news = [{"title": a.text, "url": a['href']} for a in soup.select('.search-result__title a')[:3]]
        data["sources"]["tmz"] = {"news": news, "url": tmz_url}
    except Exception as e:
        print(f"TMZ error for {name}: {e}")

    # IMDb scrape
    imdb_url = f"{SOURCES['imdb']}{quote(name)}"
    try:
        resp = requests.get(imdb_url, headers=headers)
        soup = BeautifulSoup(resp.text, 'html.parser')
        bio_link = soup.find('a', class_='ipc-metadata-list-summary-item__t')
        bio_url = f"https://www.imdb.com{bio_link['href']}" if bio_link else imdb_url
        data["sources"]["imdb"] = {"url": bio_url}
    except Exception as e:
        print(f"IMDb error for {name}: {e}")

    # Ethnic Celebs scrape
    ethnic_url = f"{SOURCES['ethnic_celebs']}{quote(name)}"
    try:
        resp = requests.get(ethnic_url, headers=headers)
        soup = BeautifulSoup(resp.text, 'html.parser')
        race = soup.find('div', class_='entry-content') or ""
        data["sources"]["ethnic_celebs"] = {"race": race.text.strip() if race else "", "url": ethnic_url}
    except Exception as e:
        print(f"Ethnic Celebs error for {name}: {e}")

    # Social media links
    twitter_url = f"{SOURCES['social_twitter']}{quote(name)}"
    insta_url = f"{SOURCES['social_insta']}{quote(name.replace(' ', ''))}"
    youtube_url = f"{SOURCES['social_youtube']}{quote(name)}"
    tiktok_url = f"{SOURCES['social_tiktok']}{quote(name)}"
    facebook_url = f"{SOURCES['social_facebook']}{quote(name)}"
    threads_url = f"{SOURCES['social_threads']}{quote(name)}"
    mastodon_url = f"{SOURCES['social_mastodon']}{quote(name)}"
    bluesky_url = f"{SOURCES['social_bluesky']}{quote(name)}"
    data["sources"]["social"] = {
        "twitter": {"url": twitter_url},
        "instagram": {"url": insta_url},
        "youtube": {"url": youtube_url},
        "tiktok": {"url": tiktok_url},
        "facebook": {"url": facebook_url},
        "threads": {"url": threads_url},
        "mastodon": {"url": mastodon_url},
        "bluesky": {"url": bluesky_url}
    }

    # Misc links
    data["sources"]["misc"] = {
        "nft": {"url": f"https://opensea.io/search?query={quote(name)}"},
        "dating": {"url": f"https://www.whosdatedwho.com/search?q={quote(name)}"},
        "nsfw": {"url": ""}
    }

    update_scraped_at(name)
    return data

# Batch processing to avoid database overload
def batch_update_celebrities(new_celebrities):
    conn = get_db_connection()
    cur = conn.cursor()
    for name in new_celebrities:
        cur.execute(
            "INSERT INTO scraped_celebrities (name, created_at, updated_at) VALUES (%s, %s, %s) ON CONFLICT (name) DO NOTHING",
            (name, datetime.now(), datetime.now())
        )
    conn.commit()
    cur.close()
    conn.close()

# Main scraping logic
def main():
    # Get existing celebrities from database
    celebrities = get_celebrities_from_db()

    # Scrape for influencers
    influencers = scrape_social_media_influencers()
    print(f"Found {len(influencers)} influencers with over 300,000 followers.")

    # Add business tycoons
    tycoons = get_business_tycoons()
    print(f"Added {len(tycoons)} business tycoons.")

    # Combine all names
    all_names = list(set(celebrities + influencers + tycoons))
    print(f"Total unique names to scrape: {len(all_names)}")

    # Batch update database with new names
    new_names = [name for name in all_names if name not in celebrities]
    if new_names:
        print(f"Adding {len(new_names)} new names to the database...")
        batch_update_celebrities(new_names)

    # Scrape in batches and save to temporary JSON files
    batch_size = 50
    all_celebs = []
    for i in range(0, len(all_names), batch_size):
        batch = all_names[i:i + batch_size]
        print(f"Scraping batch {i // batch_size + 1} of {len(all_names) // batch_size + 1}...")
        batch_data = [scrape_celebrity(name) for name in batch]
        all_celebs.extend(batch_data)
        # Save batch to temporary file
        with open(f'celebrities_batch_{i // batch_size + 1}.json', 'w') as f:
            json.dump(batch_data, f, indent=2)
        time.sleep(5)  # Avoid rate limiting

    # Combine all batches into final file
    with open('celebrities.json', 'w') as f:
        json.dump(all_celebs, f, indent=2)
    print(f"Scraped {len(all_celebs)} celebrities!")

if __name__ == "__main__":
    main()