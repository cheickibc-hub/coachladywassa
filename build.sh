#!/bin/bash
# Build script for Render deployment

# Build frontend
cd /opt/render/project/src/frontend
yarn install --frozen-lockfile 2>/dev/null || yarn install
REACT_APP_BACKEND_URL="" yarn build

# Copy frontend build to backend for serving
cp -r build /opt/render/project/src/backend/static_build

# Install backend dependencies
cd /opt/render/project/src/backend
pip install -r requirements.txt
