# ============================================================
# Stage 1: Build frontend assets (Node.js)
# ============================================================
FROM node:22-alpine AS frontend-builder

WORKDIR /app

# Copy package files first for layer caching
COPY package.json package-lock.json ./

# Install all dependencies (including dev, needed for Vite build)
RUN npm ci

# Copy source code
COPY . .

# Build production assets
RUN npm run build

# ============================================================
# Stage 2: PHP runtime
# ============================================================
FROM php:8.2-fpm-alpine AS app

LABEL maintainer="Genuine Solution"

# ---- System dependencies ----
RUN apk add --no-cache \
        bash \
        curl \
        libpng-dev \
        libjpeg-turbo-dev \
        freetype-dev \
        libzip-dev \
        oniguruma-dev \
        icu-dev \
        mysql-client \
        shadow \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo \
        pdo_mysql \
        mbstring \
        zip \
        gd \
        bcmath \
        intl \
        opcache \
    && rm -rf /var/cache/apk/*

# ---- Composer ----
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# ---- Working directory ----
WORKDIR /var/www/html

# ---- Copy application files ----
COPY . .

# ---- Copy compiled frontend assets from builder stage ----
COPY --from=frontend-builder /app/public/build ./public/build

# ---- Install PHP dependencies (production only) ----
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

# ---- PHP config ----
COPY docker/php/php.ini /usr/local/etc/php/conf.d/app.ini

# ---- Storage permissions ----
RUN mkdir -p storage/framework/{sessions,views,cache} \
             storage/logs \
             bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

# ---- Entrypoint ----
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 9000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]
