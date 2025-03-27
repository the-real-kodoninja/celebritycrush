from twocaptcha import TwoCaptcha
import logging
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def solve_recaptcha(driver):
    try:
        # Check if CAPTCHA is present
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "recaptcha-anchor")))
        logging.info("CAPTCHA detected, attempting to solve with 2Captcha...")

        solver = TwoCaptcha('your_2captcha_api_key')  # Replace with your API key
        sitekey = driver.find_element(By.CLASS_NAME, "g-recaptcha").get_attribute("data-sitekey")
        url = driver.current_url

        result = solver.recaptcha(sitekey=sitekey, url=url)
        code = result['code']
        logging.info(f"CAPTCHA solved: {code}")

        # Inject the solved CAPTCHA response
        driver.execute_script(f'document.getElementById("g-recaptcha-response").innerHTML="{code}";')
        driver.find_element(By.ID, "recaptcha-verify-button").click()
        logging.info("CAPTCHA submitted successfully!")
        return True
    except Exception as e:
        logging.error(f"CAPTCHA solving failed: {e}")
        return False

def main():
    # Test the CAPTCHA solver (requires a page with a CAPTCHA)
    pass

if __name__ == "__main__":
    main()