#!/usr/bin/env bash
#
# First-time server bootstrap for the DG Property deployment.
# Target OS: AlmaLinux 10. Run as root:
#
#   sudo bash deploy/setup-server.sh
#
# Installs Docker + Compose, nginx, certbot; creates swap; opens the firewall.
# It does NOT mount the storage volume — do that manually (see DEPLOYMENT.md)
# so the correct disk device is chosen and never the wrong one.
set -euo pipefail

echo "==> Updating system packages"
dnf -y update

echo "==> Creating 4 GB swap file (needed to build on a 2 GB server)"
if ! swapon --show | grep -q '/swapfile'; then
  fallocate -l 4G /swapfile 2>/dev/null || dd if=/dev/zero of=/swapfile bs=1M count=4096
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
  echo 'vm.swappiness=10' > /etc/sysctl.d/99-swappiness.conf
  sysctl --system >/dev/null || true
fi

echo "==> Installing Docker Engine + Compose plugin"
curl -fsSL https://download.docker.com/linux/centos/docker-ce.repo \
  -o /etc/yum.repos.d/docker-ce.repo
dnf -y install docker-ce docker-ce-cli containerd.io \
  docker-buildx-plugin docker-compose-plugin
systemctl enable --now docker

echo "==> Installing nginx + certbot"
dnf -y install epel-release || true
dnf -y install nginx certbot python3-certbot-nginx
systemctl enable --now nginx

echo "==> Allowing nginx to proxy to local app ports (SELinux)"
setsebool -P httpd_can_network_connect 1 || true

echo "==> Opening the firewall for HTTP/HTTPS"
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload

echo
echo "==> Bootstrap complete."
docker --version
docker compose version
echo "Next: mount the storage volume, then deploy (see DEPLOYMENT.md)."
