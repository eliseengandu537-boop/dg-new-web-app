#!/usr/bin/env bash
#
# Redeploy the latest code on the xneelo server.
#
#   bash deploy/update.sh
#
# Pulls the newest commit, rebuilds the images and restarts the stack.
# Uploaded images and the database live on the storage volume and are
# untouched by this.
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Pulling latest code"
git pull --ff-only

echo "==> Rebuilding and restarting containers"
docker compose -f docker-compose.prod.yml --env-file .env up -d --build

echo "==> Cleaning up old images"
docker image prune -f

echo
echo "==> Done. Current status:"
docker compose -f docker-compose.prod.yml ps
