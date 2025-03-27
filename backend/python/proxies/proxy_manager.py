import requests
import time
import random
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Real proxy pool with DigitalOcean Droplet IPs
PROXY_POOL = [
    {"ip": "new_droplet_ip_here", "port": "3128", "status": "active"},
    {"ip": "104.131.1.1", "port": "3128", "status": "active"},
    {"ip": "104.131.1.2", "port": "3128", "status": "active"},
    # Add more proxies as needed
]

def check_proxy_status(proxy):
    try:
        test_url = "http://www.google.com"
        proxy_url = f"http://{proxy['ip']}:{proxy['port']}"
        response = requests.get(test_url, proxies={"http": proxy_url, "https": proxy_url}, timeout=5)
        proxy["status"] = "active" if response.status_code == 200 else "down"
    except Exception as e:
        logging.error(f"Proxy {proxy['ip']}:{proxy['port']} failed: {e}")
        proxy["status"] = "down"
    return proxy

def get_working_proxy():
    global PROXY_POOL
    PROXY_POOL = [check_proxy_status(proxy) for proxy in PROXY_POOL]
    working_proxies = [f"http://{proxy['ip']}:{proxy['port']}" for proxy in PROXY_POOL if proxy["status"] == "active"]
    return random.choice(working_proxies) if working_proxies else None

def main():
    for _ in range(5):
        proxy = get_working_proxy()
        logging.info(f"Selected proxy: {proxy}")
        time.sleep(1)

if __name__ == "__main__":
    main()
