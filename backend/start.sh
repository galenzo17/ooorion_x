#!/bin/bash

# Load nvm and use correct Node.js version
source ~/.config/nvm/nvm.sh
nvm use 22.18.0

echo "Using Node.js version: $(node --version)"

# Start the backend
npm run start:dev