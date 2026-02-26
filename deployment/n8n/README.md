# DigyNex n8n Deployment Guide (VPS)

This guide helps you deploy n8n on a Hetzner VPS using Docker Compose.

## Prerequisites

1. Docker and Docker Compose installed on VPS.
2. Cloudflare Tunnel (Recommended) or Nginx Reverse Proxy for SSL.

## Setup Instructions

1. **Copy Files:** Transfer the contents of `deployment/n8n/` to your VPS (e.g., `/home/username/n8n/`).
2. **Edit Passwords:** Open `docker-compose.yml` and change the placeholder passwords:
   - `POSTGRES_PASSWORD`
   - `DB_POSTGRESDB_PASSWORD` (Must match above)
   - `N8N_ENCRYPTION_KEY` (Any strong secret string)
3. **Run Services:** Execute the following command:
   ```bash
   docker-compose up -d
   ```
4. **Access n8n:**
   - Go to `http://your-vps-ip:5678`
   - Create your owner account.

## Security (Advanced)

If you are using a Cloudflare Tunnel:

1. Run `cloudflared tunnel run <tunnel-name>`
2. Point the tunnel to `http://localhost:5678`.
3. Set `N8N_HOST` and `WEBHOOK_URL` in the environment variables for proper callback functionality.

## Persistence

All data is stored in Docker volumes:

- `db_storage`: Postgres database files.
- `n8n_storage`: n8n workspace and config.
