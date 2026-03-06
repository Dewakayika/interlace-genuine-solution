#!/bin/bash
set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Genuine Solution — Docker Entrypoint"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

cd /var/www/html

# ── 1. Generate APP_KEY if not set ──────────────────────────────
if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "" ]; then
    echo "→ Generating APP_KEY..."
    php artisan key:generate --force
else
    echo "→ APP_KEY already set."
fi

# ── 2. Clear config cache to pick up env vars ───────────────────
echo "→ Clearing config cache..."
php artisan config:clear

# ── 3. Wait for MySQL to be ready ──────────────────────────────
echo "→ Waiting for database connection..."
until php artisan db:monitor 2>/dev/null | grep -q "OK" || \
      mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USERNAME" -p"$DB_PASSWORD" -e "SELECT 1" 2>/dev/null; do
    echo "  DB not ready yet — retrying in 2s..."
    sleep 2
done
echo "  Database is ready!"

# ── 4. Run migrations ───────────────────────────────────────────
echo "→ Running migrations..."
php artisan migrate --force

# ── 5. Create storage symlink ───────────────────────────────────
echo "→ Linking storage..."
php artisan storage:link --force 2>/dev/null || true

# ── 6. Optimize in production ───────────────────────────────────
if [ "$APP_ENV" = "production" ]; then
    echo "→ Optimizing for production..."
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Ready — starting PHP-FPM"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

exec "$@"
