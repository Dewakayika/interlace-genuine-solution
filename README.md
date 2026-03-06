# Genuine Solution

A modern web application built with **Laravel 12** and **React 19** using **Inertia.js** for a seamless full-stack experience.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Laravel 12 (PHP 8.2) |
| Frontend | React 19 + TypeScript |
| Bridge | Inertia.js 2 |
| Styling | Tailwind CSS 4 |
| Database | MySQL |
| Testing | Pest 3 + PHPUnit 11 |
| Code Quality | ESLint + Prettier + Laravel Pint |
| Containerization | Docker / Laravel Sail |

---

## 📋 Requirements

- PHP >= 8.2
- Composer
- Node.js >= 18
- MySQL
- Docker (optional, for Sail)

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Dewakayika/interlace-genuine-solution.git
cd interlace-genuine-solution
```

### 2. Install dependencies

```bash
composer install
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
php artisan key:generate
```

Update your `.env` file with your database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=genuine_solution
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Run migrations

```bash
php artisan migrate
```

### 5. Start the development server

```bash
# Terminal 1 - Laravel backend
php artisan serve

# Terminal 2 - Vite frontend
npm run dev
```

Visit `http://localhost:8000` in your browser.

---

## 🐳 Docker / Laravel Sail

Alternatively, use Docker with Laravel Sail:

```bash
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate
```

See [DOCKER.md](./DOCKER.md) for more details.

---

## 🧪 Running Tests

```bash
# Run all tests
php artisan test

# Using Pest
./vendor/bin/pest
```

---

## 🛠️ Development Commands

```bash
# Format PHP code
./vendor/bin/pint

# Format JS/TS code
npm run format

# Lint JS/TS code
npm run lint

# Build for production
npm run build
```

---

## 📁 Project Structure

```
genuine-solution/
├── app/              # Laravel application logic
├── config/           # Configuration files
├── database/         # Migrations, seeders, factories
├── resources/        # React components, pages, assets
│   ├── js/
│   │   ├── components/   # Reusable UI components
│   │   └── pages/        # Inertia.js page components
├── routes/           # Web and API routes
├── tests/            # Feature and unit tests
└── public/           # Static assets
```

---

## 📄 License

This project is proprietary and owned by **Interlace Studies**.
