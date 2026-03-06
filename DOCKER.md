# 🐳 Running with Docker

> **Requires**: [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows / macOS / Linux)

## Quick Start

```bash
# 1. Copy environment file
cp .env.example .env

# 2. Build images and start all services  (first run takes a few minutes)
docker compose up --build

# 3. Open the app
open http://localhost:8080   # macOS
start http://localhost:8080  # Windows
```

That's it! The entrypoint script automatically:
- Generates an `APP_KEY`
- Runs database migrations
- Creates the storage symlink
- Caches config/routes/views (in production mode)

---

## Services

| Container | Role | Internal Port |
|-----------|------|---------------|
| `genuine_app` | PHP 8.2-FPM | 9000 |
| `genuine_db` | MySQL 8 | 3306 |
| `genuine_nginx` | Nginx reverse proxy | **8080** ← browser |

---

## Common Commands

```bash
# Start in background (detached)
docker compose up -d --build

# View logs
docker compose logs -f

# Run artisan commands
docker compose exec app php artisan <command>

# Open a shell inside the app container
docker compose exec app bash

# Run database migrations manually
docker compose exec app php artisan migrate

# Stop all containers
docker compose down

# Stop and remove volumes (⚠️ deletes DB data)
docker compose down -v
```

---

## Environment Variables

All variables are read from `.env`. The following are specific to the Docker setup:

| Variable | Default | Description |
|----------|---------|-------------|
| `NGINX_PORT` | `8080` | Host port for the web server |
| `DB_HOST` | `db` | Must match the compose service name |
| `DB_PORT` | `3306` | Internal MySQL port |
| `DB_DATABASE` | `genuine_solution` | Database name |
| `DB_USERNAME` | `genuine` | MySQL user |
| `DB_PASSWORD` | `secret` | MySQL user password |
| `DB_ROOT_PASSWORD` | `rootsecret` | MySQL root password |

> **Tip**: Change `NGINX_PORT` in `.env` if port 8080 is already in use on your machine.

---

## File Structure

```
├── Dockerfile                   # Multi-stage build (Node + PHP)
├── docker-compose.yml           # Service orchestration
├── .dockerignore                # Files excluded from build context
└── docker/
    ├── entrypoint.sh            # Startup script (migrations, caching…)
    ├── nginx/
    │   └── default.conf         # Nginx virtual host config
    └── php/
        └── php.ini              # PHP runtime settings
```

---

## Development vs Docker

| | Local Dev | Docker |
|---|---|---|
| Command | `composer run dev` | `docker compose up --build` |
| Hot reload | ✅ Vite HMR | ❌ (built assets only) |
| Database | Local MySQL / SQLite | MySQL container |
| Ideal for | Day-to-day coding | Cross-platform / staging |
