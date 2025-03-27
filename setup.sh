#!/bin/bash

# Exit on error
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting setup for CelebrityCrush...${NC}"

# Update package lists
echo -e "${GREEN}Updating package lists...${NC}"
sudo apt update

# Install system dependencies
echo -e "${GREEN}Installing system dependencies...${NC}"
sudo apt install -y build-essential libpq-dev nodejs npm python3 python3-pip python3-venv libsqlite3-dev squid

# Install rbenv and Ruby
if ! command -v rbenv &> /dev/null; then
    echo -e "${GREEN}Installing rbenv and Ruby...${NC}"
    git clone https://github.com/rbenv/rbenv.git ~/.rbenv
    echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
    echo 'eval "$(rbenv init -)"' >> ~/.bashrc
    source ~/.bashrc
    git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
    rbenv install 3.2.2
    rbenv global 3.2.2
fi

# Install Ruby dependencies
echo -e "${GREEN}Installing Ruby dependencies...${NC}"
cd ~/celebritycrush/backend
gem install bundler
bundle install

# Install Node.js dependencies
echo -e "${GREEN}Installing Node.js dependencies...${NC}"
cd ~/celebritycrush/frontend
npm install
npm install @stripe/stripe-js @stripe/react-stripe-js

# Set up Python virtual environment and dependencies
echo -e "${GREEN}Setting up Python virtual environment...${NC}"
cd ~/celebritycrush/backend/python
if [ ! -d "~/celebritycrush_venv" ]; then
    python3 -m venv ~/celebritycrush_venv
fi
source ~/celebritycrush_venv/bin/activate
pip install requests beautifulsoup4 psycopg2-binary selenium webdriver-manager 2captcha-python

# Set up environment variables
echo -e "${GREEN}Setting up environment variables...${NC}"
cat <<EOL >> ~/.bashrc
export STRIPE_SECRET_KEY="your_stripe_secret_key"
export STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
export TWITTER_CLIENT_ID="your_twitter_client_id"
export TWITTER_CLIENT_SECRET="your_twitter_client_secret"
export GOOGLE_CLIENT_ID="your_google_client_id"
export GOOGLE_CLIENT_SECRET="your_google_client_secret"
export TWITCH_CLIENT_ID="your_twitch_client_id"
export TWITCH_CLIENT_SECRET="your_twitch_client_secret"
export DEVISE_SECRET_KEY="your_devise_secret_key_here"
EOL
source ~/.bashrc

# Configure Squid proxy (if needed)
echo -e "${GREEN}Configuring Squid proxy...${NC}"
sudo bash -c 'cat <<EOL > /etc/squid/squid.conf
http_port 3128
acl localnet src 0.0.0.0/0
http_access allow localnet
http_access deny all
EOL'
sudo systemctl restart squid

echo -e "${GREEN}Setup complete!${NC}"
echo -e "${GREEN}To start the Rails server, run: cd ~/celebritycrush/backend && rails s${NC}"
echo -e "${GREEN}To start the frontend, run: cd ~/celebritycrush/frontend && npm start${NC}"