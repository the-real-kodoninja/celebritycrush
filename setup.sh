#!/bin/bash

# Setup script for CelebrityCrush
BASE_DIR="$HOME/celebritycrush"
echo "Starting setup in $BASE_DIR..."

# Update package list and install dependencies
sudo apt update
sudo apt install -y libpq-dev postgresql postgresql-contrib python3-venv

# Start PostgreSQL
sudo service postgresql start

# Install Ruby (via rbenv)
if ! command -v rbenv &> /dev/null; then
    echo "Installing rbenv and ruby-build..."
    sudo apt install -y git curl libssl-dev libreadline-dev zlib1g-dev autoconf bison build-essential libyaml-dev libncurses5-dev libffi-dev libgdbm-dev
    git clone https://github.com/rbenv/rbenv.git ~/.rbenv
    echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
    echo 'eval "$(rbenv init -)"' >> ~/.bashrc
    git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
fi
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
rbenv install 3.2.2 -s
rbenv global 3.2.2

# Install Node.js (via nvm)
if ! command -v nvm &> /dev/null; then
    echo "Installing nvm and Node.js..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install 20
    nvm use 20
else
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm use 20 || nvm install 20
fi

# Install Yarn (optional)
npm install -g yarn

# Backend setup
cd "$BASE_DIR/backend"
echo "Installing Ruby gems..."
gem install bundler
bundle install
rails db:drop db:create db:migrate db:seed

# Frontend setup
cd "$BASE_DIR/frontend"
echo "Installing Node packages..."
npm install

# Python setup
cd "$BASE_DIR"
echo "Setting up Python virtual env..."
rm -rf ~/celebritycrush_venv
python3 -m venv ~/celebritycrush_venv
source ~/celebritycrush_venv/bin/activate
pip install requests beautifulsoup4 google-api-python-client

# Copy to external drive (optional)
cp -r "$BASE_DIR" "/mnt/chromeos/removable/New Volume/Documents/web-os/"

echo "Setup complete! Run servers with:"
echo "Backend: cd $BASE_DIR/backend && rails s"
echo "Frontend: cd $BASE_DIR/frontend && npm start"
