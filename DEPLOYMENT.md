# Deploying DG Property to the xneelo Cloud Server

This guide deploys the **frontend (Next.js)** and **backend (Express/PostgreSQL)**
together on a single xneelo Cloud server using Docker Compose.

- **Server:** xneelo Cloud `s-g-1cpu-2gb` — 1 vCPU, 2 GB RAM, AlmaLinux 10
- **Storage:** attached block-storage volume (for image + database persistence)
- **IP:** `154.65.99.27`

## Architecture

```
                 internet
                    |
                    v
        nginx  (host, ports 80/443, HTTPS)
                    |
                    v
        frontend container  (127.0.0.1:3000)   <-- Next.js
                    |  (internal docker network)
                    v
        backend container   (:5001, private)   <-- Express API
                    |
                    v
        db container         (:5432, private)  <-- PostgreSQL
```

- Only nginx is exposed to the internet. The backend and database are **never**
  reachable from outside — the browser talks to `/api` and `/uploads` on the
  frontend, which proxies to the backend over the internal Docker network.
- Persistent data lives on the attached volume at `$DATA_DIR`:
  - `$DATA_DIR/postgres` — the database
  - `$DATA_DIR/uploads`  — uploaded property / broker images
  Rebuilds and redeploys never touch this data.

## Why a 4 GB swap file

2 GB RAM is enough to *run* the stack but not to *build* the Next.js image.
`deploy/setup-server.sh` adds a 4 GB swap file so the build completes. Builds
are slow-ish on 1 vCPU; that is expected and only affects deploy time.

---

## One-time setup

### 1. Connect to the server

```bash
ssh -i ~/.ssh/your_new_key root@154.65.99.27
```

> ⚠️ Use a **freshly generated** key — the previous one was exposed in chat and
> must be replaced via the xneelo control panel.

### 2. Bootstrap the server

Clone the repo and run the bootstrap script:

```bash
dnf -y install git
git clone --depth 1 https://github.com/eliseengandu537-boop/dg-new-web-app.git /opt/dg-property
cd /opt/dg-property
sudo bash deploy/setup-server.sh
```

This installs Docker, nginx and certbot, creates swap and opens the firewall.

> If the Docker repo has no AlmaLinux 10 packages yet, install `podman` +
> `podman-compose` instead and substitute `podman compose` for `docker compose`.

### 3. Mount the storage volume

Find the attached disk (it is the one **without** a mount point):

```bash
lsblk
```

Assuming it is `/dev/vdb` and is **empty/unformatted**:

```bash
sudo mkfs.ext4 /dev/vdb            # ONLY if the disk is new and empty
sudo mkdir -p /mnt/data
echo "UUID=$(blkid -s UUID -o value /dev/vdb) /mnt/data ext4 defaults,nofail 0 2" | sudo tee -a /etc/fstab
sudo mount -a
sudo mkdir -p /mnt/data/postgres /mnt/data/uploads
df -h /mnt/data                    # confirm it is mounted
```

### 4. Configure environment variables

```bash
cd /opt/dg-property
cp deploy/env.example .env
nano .env
```

Fill in every `CHANGE_ME` value. Generate strong secrets with:

```bash
openssl rand -base64 24   # POSTGRES_PASSWORD
openssl rand -base64 48   # JWT_SECRET
```

Set `PUBLIC_URL` to `https://your-domain` and `DATA_DIR=/mnt/data`.

### 5. Seed the existing uploaded images onto the volume

The repo ships the current broker/property images. Copy them to the volume so
existing listings keep their pictures:

```bash
cp -rn real-estate-backend/uploads/. /mnt/data/uploads/
```

### 6. Build and start the stack

```bash
docker compose -f docker-compose.prod.yml --env-file .env up -d --build
```

First build takes several minutes. Check status until all are `healthy`:

```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f backend
```

### 7. Point your domain at the server

In the xneelo DNS panel for your domain, create **A records**:

| Host  | Type | Value          |
|-------|------|----------------|
| `@`   | A    | `154.65.99.27` |
| `www` | A    | `154.65.99.27` |

Wait for DNS to propagate (`ping your-domain` should return the server IP).

### 8. Configure nginx + HTTPS

```bash
sudo cp deploy/nginx.conf /etc/nginx/conf.d/dg-property.conf
sudo sed -i 's/__DOMAIN__/your-domain.co.za/g' /etc/nginx/conf.d/dg-property.conf
sudo nginx -t && sudo systemctl reload nginx

# Issue the free Let's Encrypt certificate (also sets up auto-renewal):
sudo certbot --nginx -d your-domain.co.za -d www.your-domain.co.za
```

### 9. Verify

- `https://your-domain` — the site loads over HTTPS.
- Browse listings — images load (served via `/uploads`).
- Log in at `/login` with `DEFAULT_ADMIN_EMAIL` / `DEFAULT_ADMIN_PASSWORD`.
- In the dashboard, upload an image — it appears and survives a restart:
  ```bash
  docker compose -f docker-compose.prod.yml restart backend
  ```

---

## Redeploying after a code change

Push to GitHub, then on the server:

```bash
cd /opt/dg-property && bash deploy/update.sh
```

## Useful commands

```bash
docker compose -f docker-compose.prod.yml ps                 # status
docker compose -f docker-compose.prod.yml logs -f backend    # backend logs
docker compose -f docker-compose.prod.yml logs -f frontend   # frontend logs
docker compose -f docker-compose.prod.yml down               # stop everything
```

## Backups

The whole site state is two folders on the volume — back them up regularly:

```bash
# Database dump
docker compose -f docker-compose.prod.yml exec db \
  pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > backup-$(date +%F).sql
# Uploaded images are already plain files under /mnt/data/uploads
```

---

## Decommissioning Render & Vercel

Once the xneelo site is verified working:

1. **Vercel** — dashboard → project → Settings → *Delete Project* (or just
   remove the production domain so traffic stops).
2. **Render** — dashboard → the `dg-property-backend` service → Settings →
   *Delete Web Service*. Delete the attached disk and any managed database.
3. Update any DNS records that still point at Render/Vercel.
4. `render.yaml` has already been removed from the repo.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Build killed / out of memory | Confirm swap is active: `swapon --show`. |
| `502` from nginx | App not up yet, or SELinux: `sudo setsebool -P httpd_can_network_connect 1`. |
| API calls fail, `503` | Check `backend` is `healthy`; check `.env` has all values. |
| Images 404 | Confirm `/mnt/data/uploads` is populated and the volume is mounted. |
| Uploads fail with `413` | nginx `client_max_body_size` — already set to 100M in `nginx.conf`. |
| DB data gone after redeploy | Confirm `DATA_DIR` points at the mounted volume, not local disk. |
